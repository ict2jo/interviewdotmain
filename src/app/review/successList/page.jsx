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
    TextField,
    Pagination,
    IconButton
} from "@mui/material";
import userStore from "@/stores/UserStore";
import { Box } from "@mui/system";


export default function SuccessList() {
    /* const [successList, setSuccessList] = useState([]);
    const [selectedSuccess, setSelectedSuccess] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingContent, setEditingContent] = useState(""); // 수정할 내용 상태 추가
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState([]); // 댓글 내용 상태 추가 */

    const [successList, setSuccessList] = useState([]);
    const [selectedSuccess, setSelectedSuccess] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingContent, setEditingContent] = useState(""); // 수정할 내용 상태 추가
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState(""); // 댓글 내용 상태 추가
    const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(""); // 전체 페이지 수 상태 추가
    const successPerPage = 9; // 한 페이지당 보일 후기 개수
    const [editingCommentContent, setEditingCommentContent] = useState("");
    const [editingCommentId, setEditingCommentId] = useState("");

    useEffect(() => {
        fetchSuccessList(page); // 초기 데이터 불러오기
    }, [page]);

    const fetchSuccessList = async (page) => {
        try {
            console.log("id" + userStore.id);
            const response = await axios.get(`/success/successlist?page=${page}&limit=${successPerPage}`);
            const activeSuccesses = response.data.filter(success => success.active === '0');
            setSuccessList(activeSuccesses);
            setSuccessList("이새퀴: ", response.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("합격 후기 데이터를 불러오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        async function fetchSuccessList() {
            try {
                const response = await axios.get("/success/successlist");
                setSuccessList(response.data); // 서버에서 받은 데이터를 상태에 저장
            } catch (error) {
                console.error("합격 후기 데이터를 불러오는 중 오류 발생:", error);
            }
        }

        fetchSuccessList(); // async 함수 호출
    }, []);

    const handleSuccessClick = (success) => {
        setSelectedSuccess(success);
        setEditingContent(success.s_content); // 선택된 후기의 내용을 수정할 내용 상태에 설정
        fetchComments(success.s_idx); // 해당 후기의 댓글 목록 불러오기
        setOpenDialog(true);
    };

    useEffect(() => {
        console.log("selectedSuccess", selectedSuccess);
    }, [selectedSuccess]);

    useEffect(() => {
        console.log("comments", comments);
    }, [commentContent]);


    const fetchComments = async (s_idx) => {
        try {
            const response = await axios.get(`http://localhost:8080/commentsucc/comment?s_idx=${s_idx}`);
            setComments(response.data);
            console.log("왜 안들어가지니", response.date);
        } catch (error) {
            console.error("댓글을 불러오는 중 오류 발생:", error);
            setComments([]);
        }
    };

    const handlePostComment = async () => {
        try {
            const response = await axios.post("http://localhost:8080/commentsucc/postcomment", {
                s_idx: selectedSuccess.s_idx,
                id: userStore.id,
                su_content: commentContent
            });
            console.log("댓글 작성됨:", response.data);

            await fetchComments(selectedSuccess.s_idx); // 댓글 목록 다시 불러오기
            setCommentContent(""); // 댓글 입력 필드 초기화
            handleCloseDialog(); // 팝업 닫기

        } catch (error) {
            console.error("댓글 작성 중 오류 발생:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            // 서버에 수정할 내용 전송
            const response = await axios.post("http://localhost:8080/success/updatesuccess", {
                s_idx: selectedSuccess.s_idx,
                s_content: editingContent // 수정된 내용
            });
            console.log("후기 수정됨:", response.data);

            // 수정 후 후기 목록 다시 불러오기
            const updatedList = await fetchSuccessListFromServer();
            setSuccessList(updatedList); // 서버에서 업데이트된 목록을 다시 가져오기
            handleCloseDialog(); // 팝업 닫기

        } catch (error) {
            console.error("후기 수정 중 오류 발생:", error);
        }
    };

    const fetchSuccessListFromServer = async () => {
        try {
            const response = await axios.get("/success/successlist");
            return response.data;
        } catch (error) {
            console.error("합격 후기 데이터를 불러오는 중 오류 발생:", error);
            return [];
        }
    };

    const handleDelete = async () => {
        try {
            // 서버에 삭제할 후기 정보 전송
            const response = await axios.post("http://localhost:8080/success/deletesuccess", {
                s_idx: selectedSuccess.s_idx,
            });
            console.log("후기 삭제됨:", response.data);

            // 삭제 후 후기 목록 다시 불러오기
            await fetchSuccessList();
            handleCloseDialog(); // 팝업 닫기

        } catch (error) {
            console.error("후기 삭제 중 오류 발생:", error);
        }
    };


    const handleEditComment = (su_idx, su_content) => {
        setEditingCommentId(su_idx);
        setEditingCommentContent(su_content);
    }

    const handleUpdateComment = async (su_idx) => {
        try {
            const response = await axios.post("http://localhost:8080/comentssucc/updatecomment", {
                su_idx: su_idx,
                su_content: editingCommentContent
            });
            console.log("댓글 업데이트 : ", response.date);

            await fetchComments(selectedSuccess.s_idx);

            setEditingCommentId("");
            setEditingCommentContent("");
        } catch (error) {
            console.error("댓글 업데이트 실패 : ", error);
        }
    };

    const handleDeleteComment = async (su_idx) => {
        try {
            const response = await axios.post("http://localhost:8080/comentssucc/deletecomment", {
                su_idx: su_idx,
            })
            console.log("Comment deleted : ", response.data);

            await fetchComments(selectedSuccess.s_idx);

            handleCloseDialog();
        } catch (error) {
            console.error("Error deleting comment : ", error);
        }
    };

    const handleContentChange = (event) => {
        setEditingContent(event.target.value); // 수정할 내용 업데이트
    };

    const handleCommentChange = (event) => {
        setCommentContent(event.target.value); // 댓글 내용 업데이트
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedSuccess(null); // 선택된 후기 초기화
        setEditingContent(""); // 수정할 내용 초기화
        setCommentContent(""); // 댓글 내용 초기화
        setComments([]); // 댓글 목록 초기화
    };

    const handleWriteSuccess = () => {
        handleCloseDialog();
        window.location.href = `/review/review_success_write?s_idx=${selectedSuccess.s_idx}`;
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * successPerPage;
    const endIndex = startIndex + successPerPage;
    const currentSuccess = successList.slice(startIndex, endIndex);

    return (
        <>
            <Header />
            <Container className="reviewwrap" sx={{ width: 1000 }}>
                <Typography variant="h4" padding={"10px"}>
                    합격 후기 게시판
                </Typography>
                <Paper>
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>NO</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>작성자</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>제목</TableCell>
                                <TableCell sx={{ width: '300px', textAlign: 'center' }}>내용</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>회사</TableCell>
                                <TableCell sx={{ width: '200px', textAlign: 'center' }}>작성일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentSuccess.map((success) => (
                                <TableRow
                                    key={success.s_idx}
                                    onClick={() => {
                                        if (success.active !== '1') {
                                            handleSuccessClick(success)

                                        }
                                    }}
                                    style={{ cursor: success.active === '1' ? 'default' : 'pointer' }}
                                >
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_idx}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_id}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_title}</TableCell>
                                    <TableCell colSpan={1} sx={{ textAlign: 'center' }}>
                                        {success.active === '1' ? (
                                            <span style={{ color: 'red', marginLeft: '10px', width: '300px' }}>삭제된 게시물 입니다.</span>
                                        ) : (
                                            success.s_content
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_company}</TableCell>
                                    <TableCell sx={{ width: '200px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_regdate.substring(0, 10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleWriteSuccess} color="primary" style={{ textAlign: "center" }}>
                            작성하기
                        </Button>
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 25px 0' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <Pagination
                                /* count={totalPages} */
                                count={Math.ceil(successList.length / successPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                defaultPage={1}
                                color="primary"
                            /* size="large"
                            showFirstButton
                            showLastButton */
                            />
                        </Box>
                    </div>
                </Paper>
            </Container>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>합격 후기 상세보기 및 댓글</DialogTitle>
                <DialogContent>
                    {selectedSuccess && (
                        <>
                            <Typography variant="h6" >제목: {selectedSuccess.s_title}</Typography>
                            <Typography>작성자 : {selectedSuccess.s_id}</Typography>
                            <Typography>
                                내용:
                            </Typography>
                            <TextField
                                multiline
                                rows={6}
                                variant="outlined"
                                fullWidth
                                value={editingContent}
                                onChange={handleContentChange}
                            />
                            <Typography>회사: {selectedSuccess.s_company}</Typography>
                            <Typography>작성일 : {selectedSuccess.s_regdate}</Typography>
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
                                        {comments.filter(comments => comments.active !== '1').map((comments) => (
                                            <TableRow key={comments.su_idx}>
                                                <TableCell>{comments.su_idx}</TableCell>
                                                <TableCell>{comments.id}</TableCell>
                                                <TableCell>
                                                    {editingCommentId === comments.su_idx ? (
                                                        <TextField
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            variant="outlined"
                                                            value={editingCommentContent}
                                                            onChange={(e) => setEditingCommentContent(e.target.value)}
                                                        />
                                                    ) : (
                                                        comments.su_content
                                                    )}
                                                </TableCell>
                                                <TableCell>{comments.su_regdate}</TableCell>
                                                <TableCell>
                                                    {editingCommentId === comments.su_idx ? (
                                                        <Button onClick={() => handleUpdateComment(comments.su_idx)} color="primary">
                                                            저장
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => handleEditComment(comments.su_idx, comments.su_content)} color="primary">
                                                            수정
                                                        </Button>
                                                    )}
                                                    <Button onClick={() => handleDeleteComment(comments.su_idx)} color="primary">
                                                        삭제
                                                    </Button>
                                                </TableCell>
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
                        <Button onClick={handleDelete} color="secondary">
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