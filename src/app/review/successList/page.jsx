"use client"

import "./review_success.css"
import Header from "@/app/_components/Header"
import { useEffect, useState } from "react"
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


export default function SuccessList() {
    const [successList, setSuccessList] = useState([]);
    const [selectedSuccess, setSelectedSuccess] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [editingContent, setEditingContent] = useState(""); // 수정할 내용 상태 추가
    /* const [editingTitle, setEditingTitle] = useState(""); */
    const [commentContent, setCommentContent] = useState([]); // 댓글 내용 상태 추가
    const [comments, setComments] = useState([]);


    useEffect(() => {
        fetchSuccessList(); // 초기 데이터 불러오기
    }, []);

    const fetchSuccessList = async () => {
        try {
            const response = await axios.get("/success/successlist");
            setSuccessList(response.data); // 서버에서 받은 데이터를 상태에 저장
        } catch (error) {
            console.error("Error fetching success data:", error);
        }
    };

    useEffect(() => {
        async function fetchSuccessList() {
            try {
                const response = await axios.get("/success/successlist");
                setSuccessList(response.data); // 서버에서 받은 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching review data:", error);
            }
        }

        fetchSuccessList(); // async 함수 호출
    }, []);

    const handleSuccessClick = (success) => {
        setSelectedSuccess(success);
        /* setEditingTitle(review.r_title); // 제목 수정 */
        setEditingContent(success.s_content); // 선택된 리뷰의 내용을 수정할 내용 상태에 설정
        fetchComments(success.s_idx); // 해당 리뷰의 댓글 목록 불러오기
        setOpenDialog(true);
    };

    const fetchComments = async (s_idx) => {
        try {
            const response = await axios.get(`http://localhost:8080/success/comments?s_idx=${s_idx}`);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        console.log("selectedSuccess", selectedSuccess);
    }, [selectedSuccess])

    const handlePostComment = async () => {
        try {
            const response = await axios.post("http://localhost:8080/success/postcomment", {
                s_idx: selectedSuccess.s_idx,
                s_content: commentContent
            });
            console.log("Comment posted:", response.data);

            const newComment = response.data;

            setComments([...comments, newComment]);

            // 댓글 작성 후 댓글 목록 다시 불러오기
            await fetchComments(selectedSuccess.s_idx);
            setCommentContent(""); // 댓글 입력 필드 초기화

            handleCloseDialog();

        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            // 서버에 수정할 내용 전송
            const response = await axios.post("http://localhost:8080/success/updatesuccess", {
                s_idx: selectedSuccess.s_idx,
                s_content: editingContent // 수정된 내용
            });
            console.log("Success updated:", response.data);

            // 수정 후 리뷰 목록 다시 불러오기
            const updatedList = await fetchSuccessListFromServer(); // 서버에서 업데이트된 목록을 다시 가져오기
            setSuccessList(updatedList); // 업데이트된 목록을 상태에 반영

            handleCloseDialog(); // 팝업 창 닫기

        } catch (error) {
            console.error("Error updating review:", error);
        }
    };


    const fetchSuccessListFromServer = async () => {
        try {
            const response = await axios.get("/success/successlist");
            return response.data;
        } catch (error) {
            console.error("Error fetching success data:", error);
            return [];
        }
    };

    const handleDelete = async () => {
        try {
            // 서버에 삭제할 리뷰 정보 전송
            const response = await axios.post("http://localhost:8080/success/deletesuccess", {
                s_idx: selectedSuccess.s_idx,
            });
            console.log("Review deleted:", response.data);

            // 삭제 후 리뷰 목록 다시 불러오기
            await fetchSuccessList();
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

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedSuccess(null); // 선택된 리뷰 초기화
        setEditingContent(""); // 수정할 내용 초기화
        setCommentContent("");
        fetchComments("");  // 해당 리뷰의 댓글 목록 불러오기
    };

    const handleWriteSuccess = () => {
        handleCloseDialog();
        window.location.href = `/review/review_success_write?s_id=${selectedSuccess.s_id}`;
    }

    return (
        <>
            <Header />
            <Container>
                <Typography variant="h4" padding={"10px"}>
                    합격 후기 게시판
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>NO</TableCell>
                                <TableCell>작성자</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell>회사</TableCell>
                                <TableCell>작성일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {successList.map((success) => (
                                <TableRow
                                    key={success.s_idx}
                                    onClick={() => handleSuccessClick(success)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <TableCell>{success.s_idx}</TableCell>
                                    <TableCell>{success.s_id}</TableCell>
                                    <TableCell>{success.s_title}</TableCell>
                                    <TableCell>{success.s_content}</TableCell>
                                    <TableCell>{success.s_company}</TableCell>
                                    <TableCell>{success.s_regdate.substring(0, 10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <Pagination className="paging" count={10} variant="outlined" shape="rounded" /> */}
                    <Button onClick={handleWriteSuccess} color="primary" style={{ textAlign: "center" }}>
                        작성하기
                    </Button>
                </Paper>
            </Container>


            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>합격자 후기 상세 정보 수정</DialogTitle>
                <DialogContent>
                    {selectedSuccess && (
                        <>
                            <Typography variant="h6">제목: {selectedSuccess.s_title}</Typography>
                            <Typography>작성자: {selectedSuccess.s_id}</Typography>
                            <Typography>내용:</Typography>
                            <TextField
                                multiline
                                fullWidth
                                rows={6}
                                variant="outlined"
                                value={editingContent}
                                /* onChange={(e) => setEditingContent(e.target.value)} */
                                onChange={handleContentChange}
                            />
                            <Typography>회사: {selectedSuccess.s_company}</Typography>
                            <Typography>작성일: {selectedSuccess.s_regdate}</Typography>

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
                                onChange={(e) => setCommentContent(e.target.value)}
                                style={{ marginTop: 10 }}
                            />
                            <Button onClick={handlePostComment} color="primary" style={{ marginTop: 10 }}>
                                댓글 작성
                            </Button>
                            {/* 댓글 목록 표시 */}
                            <Typography variant="h6" style={{ marginTop: 20 }}>
                                댓글 목록
                            </Typography>
                            <Paper style={{ maxHeight: 300, overflow: 'auto', marginTop: 10 }}>
                                <Table>
                                    <TableBody>
                                        {comments.map((comment) => (
                                            <TableRow key={comment.re_idx}>
                                                <TableCell>{comment.re_content}</TableCell>
                                                <TableCell>{comment.re_regdate.substring(0, 10)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
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
                    {/* <Button onClick={handlePostComment} color="primary">
            댓글 작성
          </Button> */}
                    <Button onClick={handleCloseDialog} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}