"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Schedule.css";

const Calendar = () => {
  const plugins = [
    dayGridPlugin, // 월간 달력 // day 그리드
    timeGridPlugin, // 주간, 일간 달력 // time 그리드 보기
    interactionPlugin // 이벤트를 위한 플러그인
  ];

  return (
    <FullCalendar
      plugins={plugins}
      initialView="dayGridMonth" // 초기 뷰 설정
      headerToolbar={{ // 헤더 툴바 설정
        left: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay today"
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
      eventClick={eventClick} // 이벤트 클릭 시
      eventChange={eventChange} // 이벤트 drop 혹은 resize 될 때
      editable={true} // 사용자의 수정 가능 여부
      selectable={true} // 사용자의 날짜 선택 가능 여부
      selectMirror={true} // 사용자의 시간 선택 시 time 표시 여부
      select={select} // 날짜가 선택될 때
      weekends={true} // 주말 표시 여부
      dayMaxEvents={true} // 하루에 표시될 최대 이벤트 수
      navLinks={true} // 날짜 클릭 시 해당 날짜로 이동
      navLinkHint={"클릭시 해당 날짜로 이동합니다."} // 날짜에 호버 시 힌트 문구
      eventsSet={() => console.log("eventsSet")} // 이벤트가 설정될 때
      eventAdd={() => console.log("eventAdd")} // 이벤트 추가 시
      eventDrop={() => console.log("eventDrop")} // 이벤트 드롭 시
      eventRemove={() => console.log("eventRemove")} // 이벤트 제거 시
    />
  );
};

export default Calendar;

// 임시 데이터
const scheduleData = [
  {
    title: "단일 date",
    start: "2023-08-07T10:00:00",
    end: "2023-08-07T14:00:00"
  },
  {
    title: "단일 date",
    start: "2023-08-05",
    backgroundColor: "#727272",
    textColor: "#ffffff",
    borderColor: "#000000"
  },
  {
    title: "단일 date",
    start: "2023-08-07",
    end: "2023-08-06"
  },
  {
    title: "복수 date",
    start: "2023-08-09",
    end: "2023-08-12"
  }
];

// 이벤트 클릭 시 실행될 함수
function eventClick(info) {
  console.log('Event clicked:', info.event);
}

// 이벤트 변경 시 실행될 함수
function eventChange(info) {
  console.log('Event changed:', info.event);
}

// 날짜 선택 시 실행될 함수
function select(info) {
  console.log('Date selected:', info.startStr, info.endStr);
}
