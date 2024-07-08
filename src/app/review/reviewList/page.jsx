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
    const reviewsPerPage = 5; // 한 페이지당 보일 리뷰 개수
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
            alert("로그인 후에 볼 수 있습니다.");
            menuStore.setSelectedMenu("login");
            return;
        }
        setSelectedReview(review);
        setEditingContent(review.r_content);
        fetchComments(review.r_idx);
        setOpenDialog(true);
    };

    useEffect(() => {
        console.log("selectedReview", selectedReview);
    }, [selectedReview])

    useEffect(() => {
        console.log("comments", comments);
    }, [commentContent])


    // useEffect(() => {
    //     if (selectedReview && userStore.active === '0') {
    //         // selectedReview가 존재하고, 사용자의 active 상태가 '0'일 때 작동할 코드 추가
    //         // 예를 들어, 다음과 같은 방법으로 작성, 수정, 삭제 기능을 활성화할 수 있습니다.
    //         console.log("User can edit or delete their own reviews and comments.");
    //     }
    // }, [selectedReview, userStore.active]);

   useEffect(() => {
    
   })

    const handleContentChange = (event) => {
        setEditingContent(event.target.value); // 수정할 내용 업데이트
    };

    const handleUpdate = async () => {
        try {

            if (userStore.id !== selectedReview.r_id) {
                alert('해당 게시글의 작성자만 수정할 수 있습니다.');
                return;
            }

            if (userStore.active === '1') {
                alert('신고된 사용자는 게시글을 수정할 수 없습니다.');
                return;
            }

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
            if (userStore.id !== selectedReview.r_id) {
                alert('해당 게시글의 작성자만 삭제할 수 있습니다.');
                return;
            }
            if (userStore.active === '1') {
                alert('신고된 사용자는 게시글을 삭제할 수 없습니다.');
                return;
            }
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
            if (userStore.active === '1') {
                alert('신고된 사용자는 댓글 작성 권한이 없습니다.');
                return;
            }
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
        // 신고된 사용자가 아닌 경우에만 수정 가능
        if (userStore.active !== '1') {
            setEditingCommentId(re_idx);
            setEditingCommentContent(re_content);
        } else {
            alert('신고된 사용자는 댓글을 수정할 수 없습니다.');
        }
    }

    const handleUpdateComment = async (re_idx) => {
        try {
            // 신고된 사용자는 수정할 수 없음
            if (userStore.active === '1') {
                alert('신고된 사용자는 댓글을 수정할 수 없습니다.');
                return;
            }
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
            // 댓글 작성자인지 확인
            const commentToDelete = comments.find(comment => comment.re_idx === re_idx);
            if (commentToDelete.id !== userStore.id) {
                alert('해당 댓글의 작성자만 삭제할 수 있습니다.');
                return;
            }

            // 사용자의 active 상태 확인
            if (userStore.active === '1') {
                alert('신고된 사용자는 댓글을 삭제할 수 없습니다.');
                return;
            }
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
        // setSelectedReview(null); // 선택된 리뷰 초기화
        // setEditingContent("");  // 수정할 내용 초기화 
        setCommentContent("");
        // setComments([]); // 댓글 목록 초기화
    };

    const handleMenuClick = async (menu) => {
        if (!userStore.id) {
            alert("로그인 후에 작성할 수 있습니다.");
            menuStore.setSelectedMenu("login");
        }
        if (userStore.active === '1') {
            alert('신고된 사용자는 권한이 없습니다.');
            return;
        }
        menuStore.setSelectedMenu(menu);
        handleCloseDialog();

    };

    const handleReportReview = async () => {
        try {
            if(userStore.active === '1'){
                alert("신고된 사용자는 신고 권한이 없습니다.");
                return;
            }
            const response = await axios.post("http://localhost:8080/report/reportinsert", {
                u_idx: selectedReview.u_idx,
                u2_idx: userStore.u_idx,
                r_idx: selectedReview.r_idx
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
                <Table sx={{ minWidth: 600, marginBottom: '20px' }} >
                    <TableHead sx={{ borderTop: '3px solid blue' }} className="tablehead">
                        <TableRow>
                            {/* <TableCell sx={{ width: '100px', textAlign: 'center' }}>NO</TableCell> */}
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>작성자</TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>제목</TableCell>
                            {/* <TableCell sx={{ width: '400px', textAlign: 'center' }}>내용</TableCell> */}
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
                                {/* <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_idx}</TableCell> */}
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_id}</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_title}</TableCell>
                                <TableCell colSpan={1} sx={{ textAlign: 'center' }}>
                                    {review.active === '1' ? (
                                        <span style={{ color: 'red', marginLeft: '10px', width: '400px' }}>삭제된 게시물 입니다.</span>
                                    ) : (
                                        review.r_company
                                    )}
                                </TableCell>
                                {/* <TableCell colSpan={1} sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_company}</TableCell> */}
                                <TableCell sx={{ width: '200px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_regdate.substring(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => handleMenuClick(`review/review_list_write`)} color="primary" variant="contained" style={{ textAlign: "center" }}>
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

            <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{
                style: {
                    width: '32%',
                    maxWidth: 'none',
                },
            }}>
                <DialogTitle sx={{ fontSize: "20px", borderBottom: "2px solid blue" }}>면접 후기 상세 정보 및 댓글</DialogTitle>
                <DialogContent >
                    {selectedReview && (
                        <>
                            <Typography sx={{ fontSize: "20px", marginTop: "10px", color: "blue" }}>제목: {selectedReview.r_title}</Typography>
                            <Typography sx={{ fontSize: "15px", marginTop: "5px" }}>작성자: {selectedReview.r_id}</Typography>
                            <Typography sx={{ fontSize: "13px" }}>회사: {selectedReview.r_company}</Typography>
                            <Typography sx={{ color: "gray", fontSize: "12px", marginBottom: "5px" }}>작성일: {selectedReview.r_regdate}</Typography>

                            <Box >
                                <Typography sx={{ fontSize: "18px", marginTop: "8px" }}>내용</Typography>
                                {selectedReview.r_id !== userStore.id ?
                                    (<Typography className="dialogcotent"
                                        multiline
                                        fullWidth
                                        sx={{ marginTop: 1 }}
                                        value={editingContent}
                                        onChange={handleContentChange}
                                    >{editingContent}</Typography>) :
                                    (<TextField
                                        multiline
                                        fullWidth
                                        sx={{ backgroundColor: "white", marginTop: 1 }}
                                        value={editingContent}
                                        onChange={handleContentChange}
                                    />)}
                            </Box>
                            <Box >
                                <Typography variant="h6" style={{ marginTop: 20, fontSize: "18px", display: 'flex', justifyContent: 'space-between' }}>
                                    댓글 작성
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    placeholder="댓글을 입력하세요"
                                    value={commentContent}
                                    onChange={handleCommentChange}
                                />
                                <Button onClick={handlePostComment} variant="contained" color="primary" style={{ marginTop: "10px", fontSize: "13px", marginLeft: "385px" }}>
                                    댓글 작성
                                </Button>
                            </Box>
                            {/* 댓글 목록 표시 */}
                            <Typography variant="h6" style={{ marginTop: "5px" }}>
                                댓글 목록
                            </Typography>
                            {/* comments 배열의 길이가 0인 경우 또는 모든 댓글이 삭제된 경우 */}
                            {comments.length === 0 || comments.every(comment => comment.active === '1') ? (
                                <Typography>댓글이 없습니다.</Typography>
                            ) : (
                                <Table>
                                    <TableBody>
                                        {comments.filter(comment => comment.active !== '1').map((comment) => (
                                            <TableRow key={comment.re_idx}>
                                                <TableCell>{comment.re_idx}</TableCell>
                                                <TableCell>{comment.id}</TableCell>
                                                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px', fontSize: '12px' }}>
                                                    {editingCommentId === comment.re_idx ? (
                                                        <TextField
                                                            fullWidth
                                                            multiline
                                                            variant="outlined"
                                                            value={editingCommentContent}
                                                            sx={{ whiteSpace: 'normal', minWidth: '70px' }}
                                                            onChange={(e) => setEditingCommentContent(e.target.value)}
                                                        />
                                                    ) : (
                                                        comment.re_content
                                                    )}
                                                </TableCell>
                                                <TableCell>{comment.re_regdate}</TableCell>
                                                <TableCell>
                                                    {comment.id === userStore.id && (
                                                        <Box sx={{ display: 'flex', marginTop: 1, fontSize: '10px' }}>
                                                            {editingCommentId === comment.re_idx ? (
                                                                <Button onClick={() => handleUpdateComment(comment.re_idx)} color="primary" sx={{ whiteSpace: 'nowrap', fontSize: '13px', minWidth: 'auto', marginRight: 1 }}>
                                                                    저장
                                                                </Button>
                                                            ) : (
                                                                <Button onClick={() => handleEditComment(comment.re_idx, comment.re_content)} color="primary" sx={{ whiteSpace: 'nowrap', fontSize: '13px' }}>
                                                                    수정
                                                                </Button>
                                                            )}
                                                            <Button onClick={() => handleDeleteComment(comment.re_idx)} color="primary" sx={{ whiteSpace: 'nowrap', fontSize: '13px' }}>
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