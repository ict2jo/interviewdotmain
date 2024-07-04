"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Schedule.css";
import userStore from "@/stores/UserStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Fade, Input, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { format } from 'date-fns';
const Calendar = () => {
  const employKey = process.env.NEXT_PUBLIC_EMPOLY_KEY;
  const plugins = [
    dayGridPlugin, // 월간 달력 // day 그리드
    timeGridPlugin, // 주간, 일간 달력 // time 그리드 보기
    interactionPlugin // 이벤트를 위한 플러그인
  ];

  const API_URL = `/mypage/selectCalendar?u_idx=${userStore.u_idx}`;
  const [scheduleData, setScheduleData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [c_idx, setC_idx] = useState("");
  const [recrutPbancTtl, setRecrutPbancTtl] = useState("");
  const [newEventStart, setNewEventStart] = useState(null);
  const [newEventEnd, setNewEventEnd] = useState(null);
  const [list, setList] = useState([]);
  const [newEventColor, setNewEventColor] = useState("#E0FFFF");

  const fetchData = async () => {
    try {
        // 1. 첫 번째 API 호출
        const response = await axios.get(API_URL);
        console.log(response.data);
        setScheduleData(response.data);

        // 2. /mypage/getstar API 호출
        const getStarResponse = await axios.get("/mypage/getstar", {
            params: {
                u_idx: userStore.u_idx
            }
        });

        const favoriteSnList = getStarResponse.data.map(item => item.f_num);
        console.log("getstar22", favoriteSnList);

        // 3. favoriteSnList를 기반으로 API 호출
        const results = [];
        for (const sn of favoriteSnList) {
            const queryParams = `serviceKey=${employKey}&sn=${sn}`;
            const API_URL = `/recruitment/detail?${queryParams}`;
            const response = await axios.get(API_URL);
            results.push(response.data.result);
        }

        // 4. 결과를 세션 스토리지에 저장 (옵션)
        sessionStorage.setItem('recruitmentListData', JSON.stringify(results));

        // 5. 상태 업데이트 및 로딩 상태 변경
        setList(results);
        console.log("Recruitment details:", results);
    } catch (error) {
        alert("데이터를 가져오는 데 실패했습니다.");
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
};
const handleRecruitChange = (event) => {
  const selectedValue = event.target.value; // 선택된 값
    const selectedRecruitInfo = list.find(item => item.recrutPbancTtl === selectedValue);
    setNewEventTitle(selectedRecruitInfo ? selectedRecruitInfo.recrutPbancTtl : ''); 
    setRecrutPbancTtl(selectedRecruitInfo ? selectedRecruitInfo.recrutPbancTtl : '');
    setNewEventStart(selectedRecruitInfo ? formatDate(selectedRecruitInfo.pbancBgngYmd) : null);
    setNewEventEnd(selectedRecruitInfo ? formatDate(selectedRecruitInfo.pbancEndYmd) : null);
};
const formatDate = (dateString) => {
    if (!dateString) return null;
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    fetchData();
    console.log(scheduleData);
  }, []);
  
  const handleAddEventButtonClick = () => {
    const today = new Date();
    const formattedToday = format(today, "yyyy-MM-dd");

    handleSelect({
      startStr: formattedToday,
      endStr: formattedToday,
    });
  };

  const handleSelect = (info) => {
    console.log('Date selected:', info);
    setModalOpen(true);
    setNewEventStart(info.startStr);
    setNewEventEnd(info.endStr);
    //setNewEventColor(info.event.backgroundColor);
  };
  const handleEventClick = (info) => {
    console.log('Date selected:', info);
    setModal2Open(true);
    setNewEventStart(info.event.startStr);
    setNewEventEnd(info.event.endStr);
    setNewEventTitle(info.event._def.title);
    setC_idx(info.event._def.extendedProps.c_idx);
    setNewEventColor(info.event.backgroundColor);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModal2Open(false);
    setNewEventTitle("");
    setNewEventStart(null);
    setNewEventEnd(null);
    setNewEventColor("#a0c5ff");
  };

  const handleModalEdit = (info) => {
    if (!newEventTitle) {
      alert('일정 제목을 입력하세요.');
      return;
    }
    if (!newEventStart || !newEventEnd) {
      alert('날짜를 입력하세요.');
      return;
    }
    if (new Date(newEventEnd) < new Date(newEventStart)) {
      alert('종료일이 시작일보다 빠릅니다.');
      return;
    }

    const newEvent = {
      c_idx: c_idx,
      title: newEventTitle,
      start: newEventStart,
      end: newEventEnd,
      color: newEventColor,
      allDay: false // 예시에서는 allDay를 false로 설정합니다.
    };

    axios
      .post('/mypage/updateCalendar', newEvent)
      .then((response) => {
        console.log('일정 추가 성공:', response.data);
        //handleCloseModal();
        location.reload();
      })
      .catch((error) => {
        alert('일정 추가 중 오류가 발생했습니다.');
        console.error('일정 추가 오류:', error);
      });
  };
  const handleModalSubmit = () => {
    if (!newEventTitle) {
      alert('일정 제목을 입력하세요.');
      return;
    }
    if (!newEventStart || !newEventEnd) {
      alert('날짜를 입력하세요.');
      return;
    }
    if (new Date(newEventEnd) < new Date(newEventStart)) {
      alert('종료일이 시작일보다 빠릅니다.');
      return;
    }

    const newEvent = {
      u_idx: userStore.u_idx,
      title: newEventTitle,
      start: newEventStart,
      end: newEventEnd,
      color: newEventColor,
      allDay: false // 예시에서는 allDay를 false로 설정합니다.
    };

    axios
      .post('/mypage/insertCalendar', newEvent)
      .then((response) => {
        console.log('일정 추가 성공:', response.data);
        //handleCloseModal();
        location.reload();
      })
      .catch((error) => {
        alert('일정 추가 중 오류가 발생했습니다.');
        console.error('일정 추가 오류:', error);
      });
  };
  const handleEventDrop = (info) => {
    console.log(info);
    if (confirm(`'${info.event.title}' 일정을 수정하시겠습니까?`)) {
      const updatedEvent = {
        c_idx: info.event._def.extendedProps.c_idx,
        title: info.event._def.title,
        start: info.event.startStr, // 수정된 시작 시간
        end: info.event.endStr === "" ? info.event.startStr + "T01:00:00" : info.event.endStr,
      };
      console.log(updatedEvent);
      
      axios.post('/mypage/updateCalendar', updatedEvent)
        .then(response => {
          console.log('이벤트 수정 성공:', response.data);
        })
        .catch(error => {
          console.error('이벤트 수정 실패:', error);
        });
    } else {
      location.reload(); // 확인하지 않았을 경우 페이지 새로고침
    }
  };
  const handleEventResize = (info) => {
    if (confirm(`'${info.event.title}' 일정을 수정하시겠습니까?`)) {
      const updatedEvent = {
        c_idx: info.event._def.extendedProps.c_idx,
        title: info.event._def.title,
        start: info.event.startStr, // 수정된 시작 시간
        end: info.event.endStr,
        // oldTitle: info.oldEvent._def.title,
        // oldStart: info.oldEvent._instance.range.start,
        // oldEnd: info.oldEvent._instance.range.end,
      };

      // PATCH 요청으로 변경된 이벤트 업데이트
      axios.post('/mypage/updateCalendar', updatedEvent)
        .then(response => {
          console.log('이벤트 수정 성공:', response.data);
        })
        .catch(error => {
          console.error('이벤트 수정 실패:', error);
        });
    } else {
      location.reload(); // 확인하지 않았을 경우 페이지 새로고침
    }
  };
  const handleEventDelete = () => {
    if (confirm(`'${newEventTitle}' 일정을 삭제하시겠습니까?`)) {
      axios
        .post('/mypage/deleteCalendar', { c_idx: c_idx })
        .then((response) => {
          console.log('일정 삭제 성공:', response.data);
          location.reload();
        })
        .catch((error) => {
          alert('일정 삭제 중 오류가 발생했습니다.');
          console.error('일정 삭제 오류:', error);
        });
    }
  };
  
  const handleColorChange = (event) => {
    setNewEventColor(event.target.value);
  };
  return (
    <div className="calendar">
    <FullCalendar
      plugins={plugins}
      initialView="dayGridMonth" // 초기 뷰 설정
      headerToolbar={{ // 헤더 툴바 설정
        left: "title",
        center: 'addEventButton',
        right: "dayGridMonth,today"
      }}
      footerToolbar={{ // 푸터 툴바 설정
        left: "prev",
        right: "next"
      }}
      buttonText={{ // 버튼 텍스트 설정
        today: "오늘",
        month: "월별",
        week: "주별",
        day: "일별",
        list: "리스트"
      }}
      events={scheduleData} // 달력에 표시 될 이벤트
      customButtons={{ // 커스텀 버튼 설정
        addEventButton: {
          text: "일정 추가",
          click: handleAddEventButtonClick,
        },
      }}
      //eventChange={eventChange} // 이벤트 drop 혹은 resize 될 때
      editable={true} // 사용자의 수정 가능 여부
      selectable={true} // 사용자의 날짜 선택 가능 여부
      selectMirror={true} // 사용자의 시간 선택 시 time 표시 여부
      select={handleSelect} // 날짜가 선택될 때
      weekends={true} // 주말 표시 여부
      dayMaxEvents={true} // 하루에 표시될 최대 이벤트 수
      navLinks={true} // 날짜 클릭 시 해당 날짜로 이동
      navLinkHint={"클릭시 해당 날짜로 이동합니다."} // 날짜에 호버 시 힌트 문구
      eventsSet={() => console.log("eventsSet")} // 이벤트가 설정될 때
      eventAdd={() => console.log("eventAdd")} // 이벤트 추가 시
      eventDrop={handleEventDrop} // 이벤트 드롭 시
      eventRemove={() => console.log("eventRemove")} // 이벤트 제거 시
      eventResize={handleEventResize}
      eventClick={handleEventClick}
      locale='ko'
      />

<Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      }}
    >
      <Fade in={modalOpen}>
        <div className="modalbox">
          <h2>일정 추가</h2>
          <TextField
            id="event-title"
            label="제목"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2, mt: 3 }}
          />
          <TextField
            id="event-start"
            label="시작날짜"
            type="date"
            value={newEventStart}
            onChange={(e) => setNewEventStart(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="event-end"
            label="끝날짜"
            type="date"
            value={newEventEnd}
            onChange={(e) => setNewEventEnd(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
           <InputLabel>색상 선택</InputLabel>
          <div>
                <label>
                  <input type="radio" name="color" value="#E0FFFF" checked={newEventColor === "#E0FFFF"} onChange={handleColorChange} />
                  <div className="color-box" style={{backgroundColor: '#E0FFFF'}}></div>
                </label>
                <label>
                  <input type="radio" name="color" value="#a0c5ff" checked={newEventColor === "#a0c5ff"} onChange={handleColorChange} />
                  <div className="color-box" style={{backgroundColor: '#a0c5ff'}}></div>
                </label>
                <label>
                  <input type="radio" name="color" value="#98FB" checked={newEventColor === "#98FB"} onChange={handleColorChange} />
                  <div className="color-box" style={{backgroundColor: '#98FB'}}></div>
                </label>
              </div>
          <InputLabel id="demo-simple-select-label">채용공고추가</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="즐겨찾는 공고"
        fullWidth
        value={recrutPbancTtl}
        onChange={handleRecruitChange}
      >{list.map((item, index) => (
        <MenuItem key={index} value={item.recrutPbancTtl}>{item.recrutPbancTtl}</MenuItem>
      ))}
      </Select>
          <div>
            <Button onClick={handleModalSubmit} variant="contained" color="primary" sx={{ mr: 2 }}>
              추가
            </Button>
            <Button onClick={handleCloseModal} variant="contained" color="secondary">
              닫기
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
<Modal
      open={modal2Open}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      }}
    >
      <Fade in={modal2Open}>
        <div className="modalbox">
          <h2>일정 수정</h2>
          <TextField
            id="event-title"
            label="제목"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2, mt: 3 }}
          />
          <TextField
            id="event-start"
            label="시작날짜"
            type="date"
            value={newEventStart}
            onChange={(e) => setNewEventStart(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="event-end"
            label="끝날짜"
            type="date"
            value={newEventEnd}
            onChange={(e) => setNewEventEnd(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <InputLabel>색상 선택</InputLabel>
          <div>
                <label>
                  <input type="radio" name="color" value="#E0FFFF" checked={newEventColor === "#E0FFFF"} onChange={handleColorChange} />
                  <div className="color-box" style={{backgroundColor: '#E0FFFF'}}></div>
                </label>
                <label>
                  <input type="radio" name="color" value="#a0c5ff" checked={newEventColor === "#a0c5ff"} onChange={handleColorChange} />
                  <div className="color-box" style={{backgroundColor: '#a0c5ff'}}></div>
                </label>
                <label>
                  <input type="radio" name="color" value="#98FB" checked={newEventColor === "#98FB"} onChange={handleColorChange} />
                  <div className="color-box" style={{backgroundColor: '#98FB'}}></div>
                </label>
              </div>
          <InputLabel id="demo-simple-select-label">채용공고수정</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="즐겨찾는 공고"
        fullWidth
        value={recrutPbancTtl}
        onChange={handleRecruitChange}
      >{list.map((item, index) => (
        <MenuItem key={index} value={item.recrutPbancTtl}>{item.recrutPbancTtl}</MenuItem>
      ))}
      </Select>
          <div>
            <Button onClick={handleModalEdit} variant="contained" color="primary" sx={{ mr: 2 }}>
              수정
            </Button>
            <Button onClick={handleEventDelete} variant="contained" color="secondary">
              삭제
            </Button>
            <Button onClick={handleCloseModal} variant="contained" color="secondary">
              닫기
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
    </div>
  );
};

export default Calendar;

// // 임시 데이터
// const scheduleData = [
//   {
//     title: "단일 date",
//     start: "2023-08-07T10:00:00",
//     end: "2023-08-07T14:00:00"
//   },
//   {
//     title: "단일 date",
//     start: "2023-08-05",
//     backgroundColor: "#727272",
//     textColor: "#ffffff",
//     borderColor: "#000000"
//   },
//   {
//     title: "단일 date",
//     start: "2023-08-07",
//     end: "2023-08-06"
//   },
//   {
//     title: "복수 date",
//     start: "2023-08-09",
//     end: "2023-08-12"
//   }
// ];

// 이벤트 클릭 시 실행될 함수
// function eventClick(info) {
//   console.log('Event clicked:', info.event);
// }

// 이벤트 변경 시 실행될 함수
// function eventChange(info) {
//   console.log('Event changed:', info.event);
// }

// // 날짜 선택 시 실행될 함수
// function select(info) {
  
// }
