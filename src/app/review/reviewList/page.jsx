// Review_List.js
"use client"

import "./reviewList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "@/stores/UserStore";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Pagination,
    IconButton,
    Select,
    MenuItem
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import menuStore from "@/stores/MenuStore";

export default function ReviewList() {
    const [reviewList, setReviewList] = useState([]);
    const [selectedReview, setSelectedReview] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingContent, setEditingContent] = useState(""); // 수정할 내용 상태 추가
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState(""); // 댓글 내용 상태 추가
    const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(""); // 전체 페이지 수 상태 추가
    const reviewsPerPage = 9; // 한 페이지당 보일 리뷰 개수
    const [editingCommentContent, setEditingCommentContent] = useState("");
    const [editingCommentId, setEditingCommentId] = useState("");

    const router = useRouter();

    useEffect(() => {
        fetchReviewList(page); // 초기 데이터 불러오기
    }, [page]);

    const fetchReviewList = async (page) => {
        try {
            console.log("id" + userStore.id);
            const response = await axios.get(`/review/reviewlist?page=${page}&limit=${reviewsPerPage}`);
            const activeReviews = response.data.filter(review => review.active === '0');
            setReviewList(activeReviews);
            setReviewList(response.data); // 서버에서 받은 데이터를 상태에 저장
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching review data:", error);
        }
    };

    useEffect(() => {
        async function fetchReviewList() {
            try {
                const response = await axios.get("/review/reviewlist");
                setReviewList(response.data); // 서버에서 받은 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching review data:", error);
            }
        }

        fetchReviewList(); // async 함수 호출
    }, []);



    const handleReviewClick = (review) => {
        if (!userStore.id) {
            alert("로그인 후에 작성할 수 있습니다.");
            router.push("/signin/login"); // 로그인 페이지로 이동
            return;
        }
        setSelectedReview(review);
        setEditingContent(review.r_content); // 선택된 리뷰의 내용을 수정할 내용 상태에 설정
        fetchComments(review.r_idx); // 해당 리뷰의 댓글 목록 불러오기
        setOpenDialog(true);
    };

    useEffect(() => {
        console.log("selectedReview", selectedReview);
    }, [selectedReview])

    useEffect(() => {
        console.log("comments", comments);
    }, [commentContent])

    const handleContentChange = (event) => {
        setEditingContent(event.target.value); // 수정할 내용 업데이트
    };

    const handleUpdate = async () => {
        try {
            // 서버에 수정할 내용 전송
            const response = await axios.post("http://localhost:8080/review/updatereview", {
                r_idx: selectedReview.r_idx,
                r_content: editingContent // 수정된 내용
            });
            console.log("Review updated:", response.data);

            // 수정 후 리뷰 목록 다시 불러오기
            const updatedList = await fetchReviewListFromServer(); // 서버에서 업데이트된 목록을 다시 가져오기
            setReviewList(updatedList);
            
            handleCloseDialog(); // 팝업 창 닫기

        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    const fetchReviewListFromServer = async () => {
        try {
            const response = await axios.get("/review/reviewlist");
            return response.data;
        } catch (error) {
            console.error("Error fetching review data:", error);
            return [];
        }
    };

    const handleDelete = async () => {
        try {
            // 서버에 삭제할 리뷰 정보 전송
            const response = await axios.post("http://localhost:8080/review/deletereview", {
                r_idx: selectedReview.r_idx,
            });
            console.log("Review deleted:", response.data);

            // 삭제 후 리뷰 목록 다시 불러오기
            await fetchReviewList();
            handleCloseDialog(); // 팝업 창 닫기

        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const fetchComments = async (r_idx) => {
        try {
            const response = await axios.get(`http://localhost:8080/comments/comment?r_idx=${r_idx}`);
            setComments(response.data);
            console.log("댓글 : ", response.data);
            /* setCommentContent(response.data); */
        } catch (error) {
            console.error("Error fetching comments:", error);
            setComments([]);
        }
    };

    const handlePostComment = async () => {
        try {
            const response = await axios.post("http://localhost:8080/comments/postcomment", {
                r_idx: selectedReview.r_idx,
                id: userStore.id,
                re_content: commentContent
            });
            console.log("Review updated:", response.data);

            // 댓글 작성 후 댓글 목록 다시 불러오기
            // const updatedComments = await fetchComments(selectedReview.r_idx);
            // setComments(updatedComments); // 댓글 목록에 새로운 댓글 추가
            await fetchComments(selectedReview.r_idx);

            setCommentContent(""); // 댓글 입력 필드 초기화  //
            /* handleCloseDialog(); // 팝업 창 닫기 */


        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };



    const handleEditComment = (re_idx, re_content) => {
        setEditingCommentId(re_idx);
        setEditingCommentContent(re_content);
    }

    const handleUpdateComment = async (re_idx) => {
        try {
            const response = await axios.post("http://localhost:8080/comments/updatecomment", {
                re_idx: re_idx,
                re_content: editingCommentContent
            });
            console.log("Comment updated:", response.data);

            // 수정 후 댓글 목록 다시 불러오기
            await fetchComments(selectedReview.r_idx);

            // 수정 상태 초기화
            setEditingCommentId(""); // 수정 중인 댓글 ID 초기화
            setEditingCommentContent(""); // 수정 중인 댓글 내용 초기화
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDeleteComment = async (re_idx) => {
        try {
            const response = await axios.post("http://localhost:8080/comments/deletecomment", {
                re_idx: re_idx,
            })
            console.log("Comment deleted:", response.data);

            // 삭제 후 댓글 목록 다시 불러오기
            await fetchComments(selectedReview.r_idx);

            /* handleCloseDialog(); // 팝업 창 닫기 */
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };


    const handleCommentChange = (event) => {
        setCommentContent(event.target.value);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReview(null); // 선택된 리뷰 초기화
        setEditingContent(""); // 수정할 내용 초기화
        setCommentContent("");
        setComments([]); // 댓글 목록 초기화
    };

    const handleMenuClick = async (menu) => {
        menuStore.setSelectedMenu(menu);
        if (!userStore.id) {
            alert("로그인 후에 작성할 수 있습니다.");
            router.push("/signin/login");
        }
        handleCloseDialog();
    };

    const handleReportReview = async () => {
        try {
            const response = await axios.post("http://localhost:8080/report/reportinsert", {
                u_idx: selectedReview.u_idx,
                u2_idx: userStore.u_idx,
                r_idx: selectedReview.r_idx,
                rep_active: "1"
            });
            console.log("리뷰리스트_idx", selectedReview.u_idx),
            console.log("Review reported:", response.data);
            handleCloseDialog();
        } catch (error) {
            console.error("Error reporting review:", error);
        }
    };



    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const startIndex = (page - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const currentReview = reviewList.slice(startIndex, endIndex);

    return (
        <>
            <Container className="reviewwrap" sx={{ width: 1000 }}>
                    <h1>면접 후기 게시판</h1>
                    <Table sx={{ minWidth: 600, marginBottom:'20px' }} >
                        <TableHead sx={{borderTop: '3px solid blue'}} className="tablehead">
                            <TableRow>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>NO</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>작성자</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>제목</TableCell>
                                <TableCell sx={{ width: '400px', textAlign: 'center' }}>내용</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>회사</TableCell>
                                <TableCell sx={{ width: '200px', textAlign: 'center' }}>작성일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentReview.map((review) => (
                                <TableRow
                                    key={review.r_idx}
                                    onClick={() => {
                                        if (review.active !== '1') {
                                            handleReviewClick(review)

                                        }
                                    }}
                                    style={{ cursor: review.active === '1' ? 'default' : 'pointer' }}
                                >
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_idx}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_id}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_title}</TableCell>
                                    <TableCell colSpan={1} sx={{ textAlign: 'center' }}>
                                        {review.active === '1' ? (
                                            <span style={{ color: 'red', marginLeft: '10px', width: '400px' }}>삭제된 게시물 입니다.</span>
                                        ) : (
                                            review.r_content
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_company}</TableCell>
                                    <TableCell sx={{ width: '200px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_regdate.substring(0, 10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button  onClick={() => handleMenuClick(`review/review_list_write`)} color="primary" style={{ textAlign: "center" }}>
                            작성하기
                        </Button>
                    </Box>
                    {/* 페이지네이션 */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 25px 0' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <Pagination
                                count={Math.ceil(reviewList.length / reviewsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </div>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>면접 후기 상세 정보 및 댓글</DialogTitle>
                <DialogContent >
                    {selectedReview && (
                        <>
                            <Typography variant="h5">제목: {selectedReview.r_title}</Typography>
                            <Typography variant="h6">작성자: {selectedReview.r_id}</Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <Typography>내용:</Typography>
                            {selectedReview.r_id !== userStore.id ? 
                             
                            (<Typography className="dialogcotent"
                                multiline
                                fullWidth
                                variant="filled"
                                sx={{ marginTop: 1 }}
                                value={editingContent}
                                onChange={handleContentChange}
                            >{editingContent}</Typography>): 
                            (<TextField
                                multiline
                                fullWidth
                                variant="filled"
                                sx={{ backgroundColor: "white", marginTop: 1  }}
                                value={editingContent}
                                onChange={handleContentChange}
                            />)}
                            </Box>
                            
                            <Typography>회사: {selectedReview.r_company}</Typography>
                            <Typography>작성일: {selectedReview.r_regdate}</Typography>
                            <Typography variant="h6" style={{ marginTop: 20 }}>
                                댓글 작성
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="댓글을 입력하세요"
                                value={commentContent}
                                onChange={handleCommentChange}
                            />
                            <Button onClick={handlePostComment} color="primary" style={{ marginTop: 10 }}>
                                댓글 작성
                            </Button>
                            {/* 댓글 목록 표시 */}
                            <Typography variant="h6" style={{ marginTop: 20 }}>
                                댓글 목록
                            </Typography>
                            {comments.length === 0 ? (
                                <Typography>댓글이 없습니다.</Typography>
                            ) : (
                                <Table>
                                    <TableBody>
                                        {comments.filter(comments => comments.active !== '1').map((comments) => (
                                            <TableRow key={comments.re_idx}>
                                                <TableCell>{comments.re_idx}</TableCell>
                                                <TableCell>{comments.id}</TableCell>
                                                <TableCell>
                                                    {editingCommentId === comments.re_idx ? (
                                                        <TextField
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            variant="outlined"
                                                            value={editingCommentContent}
                                                            sx={{ whiteSpace: 'nowrap' }}
                                                            onChange={(e) => setEditingCommentContent(e.target.value)}
                                                        />
                                                    ) : (
                                                        comments.re_content
                                                    )}
                                                </TableCell>
                                                <TableCell>{comments.re_regdate}</TableCell>
                                                <TableCell>
                                                    {comments.id === userStore.id && (
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            {editingCommentId === comments.re_idx ? (
                                                                <Button onClick={() => handleUpdateComment(comments.re_idx)} color="primary" sx={{ whiteSpace: 'nowrap' }}>
                                                                    저장
                                                                </Button>
                                                            ) : (
                                                                <Button onClick={() => handleEditComment(comments.re_idx, comments.re_content)} color="primary" sx={{ whiteSpace: 'nowrap' }}>
                                                                    수정
                                                                </Button>
                                                            )}
                                                            <Button onClick={() => handleDeleteComment(comments.re_idx)} color="primary" sx={{ whiteSpace: 'nowrap' }}>
                                                                삭제
                                                            </Button>

                                                        </Box>

                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 1 }}>
                    {userStore.id === selectedReview?.r_id && (
                        <>
                            <Button onClick={handleUpdate} color="primary" sx={{ whiteSpace: 'nowrap' }}>
                                수정
                            </Button>
                            <Button onClick={handleDelete} color="primary" sx={{ whiteSpace: 'nowrap' }}>
                                삭제
                            </Button>
                        </>
                    )}
                    <Button onClick={handleReportReview} color="primary" sx={{ whiteSpace: 'nowrap' }}>
                        신고하기
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary" sx={{ whiteSpace: 'nowrap' }}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}