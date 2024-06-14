"use client"

import Header from "../_components/Header"
import "./success_write.css"
export default function Success_Write() {
    return (
        <>
            <Header />
            <div className="write_container">
                <h1>합격자 후기 작성</h1>
                <div className="write_list">
                    <div className="write_area">
                        <div className="write_box">
                            제목 : <input type="text" />
                        </div>
                        <div className="write_sub">
                            회사 명 : <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="write_content">
                    <p>내용을 입력해주세요...<br />
                        내용을 입력해주세요...<br />
                        내용을 입력해주세요...<br />
                        내용을 입력해주세요...<br />
                        내용을 입력해주세요...<br />
                        내용을 입력해주세요...<br />
                        내용을 입력해주세요...
                    </p>
                </div>
            </div>
        </>
    )
}