// Review_List.js
"use client"

import "./reviewList.css";
import Header from "@/app/_components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

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
    TextField
} from "@mui/material";

export default function ReviewList() {
    const [reviewList, setReviewList] = useState([]);
    const [selectedReview, setSelectedReview] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [editingContent, setEditingContent] = useState(""); // 수정할 내용 상태 추가
    const [commentList, setCommetList] = useState([]);
    const [commentContent, setCommentContent] = useState(""); // 댓글 내용 상태 추가
    const [comments, setComments] = useState([]);


    useEffect(() => {
        fetchReviewList(); // 초기 데이터 불러오기
    }, []);

    const fetchReviewList = async () => {
        try {
            const response = await axios.get("/review/reviewlist");
            setReviewList(response.data); // 서버에서 받은 데이터를 상태에 저장
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
        setSelectedReview(review);
        setEditingContent(review.r_content); // 선택된 리뷰의 내용을 수정할 내용 상태에 설정
        fetchComments(review.r_idx); // 해당 리뷰의 댓글 목록 불러오기
        setOpenDialog(true);
    };

    

    


    useEffect(() => {
        console.log("selectedReview", selectedReview);
    }, [selectedReview])

    const handlePostComment = async () => {
        try {
            const response = await axios.post("http://localhost:8080/review/postcomment", {
                r_idx: selectedReview.r_idx,
                re_content: commentContent
            });
            console.log("Comment posted:", response.data);

            const newComment = response.data;
            console.log("새로운 댓글 들어가?" + response.data);

            setComments([...comments, newComment]); // 댓글 목록에 새로운 댓글 추가
            setCommentContent(""); // 댓글 입력 필드 초기화


            // 댓글 작성 후 댓글 목록 다시 불러오기
            fetchComments(selectedReview.r_idx);
            console.log("댓글 목록 다시 불러와? " + selectedReview.r_idx);

            const commentList = await fetchComments();

            setCommetList(commentList);

            handleCloseDialog(); // 팝업 창 닫기


        } catch (error) {
            console.error("Error posting comment:", error);
        }
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
           
            setReviewList(updatedList); // 업데이트된 목록을 상태에 반영
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

    const fetchComments = async (r_idx) => {
        try {
            const response = await axios.get(`http://localhost:8080/review/comments?r_idx=${r_idx}`);
            return response.data;
            /* setComments(response.data); */
        } catch (error) {
            console.error("Error fetching comments:", error);
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

    /* const handleTitleChange = (event) => {
      setEditingTitle(event.target.value);
    } */

    const handleContentChange = (event) => {
        setEditingContent(event.target.value); // 수정할 내용 업데이트
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

    const handleWriteReview = () => {
        handleCloseDialog();
        window.location.href = `/review/review_list_write?r_id=${selectedReview.r_id}`;
    }

    return (
        <>
            <Header />
            <Container className="reviewwrap" sx={{ width: 1000 }}>
                <Typography variant="h4" padding={"10px"}>
                    면접 후기 게시판
                </Typography>
                <Paper>
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>NO</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>작성자</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>제목</TableCell>
                                <TableCell sx={{ width: '200px', textAlign: 'center' }}>내용</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>회사</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>작성일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviewList.map((review) => (
                                <TableRow
                                    key={review.r_idx}
                                    onClick={() => handleReviewClick(review)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.r_idx}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.r_id}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.r_title}</TableCell>
                                    <TableCell sx={{ width: '200px', textAlign: 'center' }}>{review.r_content}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.r_company}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.r_regdate.substring(0, 10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button onClick={handleWriteReview} color="primary" style={{ textAlign: "center" }}>
                        작성하기
                    </Button>
                </Paper>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>면접 후기 상세 정보 및 댓글</DialogTitle>
                <DialogContent>
                    {selectedReview && (
                        <>
                            <Typography variant="h6">제목: {selectedReview.r_title}</Typography>
                            <Typography>작성자: {selectedReview.r_id}</Typography>
                            <Typography>내용:</Typography>
                            <TextField
                                multiline
                                fullWidth
                                rows={6}
                                variant="outlined"
                                value={editingContent}
                                onChange={handleContentChange}
                            />
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
                                style={{ marginTop: 10 }}
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
                                        {comments.map((comment) => (
                                            <TableRow key={comment.re_idx}>
                                                <TableCell>{comment.re_idx}</TableCell>
                                                <TableCell>{comment.re_content}</TableCell>
                                                <TableCell>{comment.re_regdate}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate} color="primary">
                        수정
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        삭제
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}