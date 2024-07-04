import Image from "next/image";
import bg from "../../../public/images/bg.png"
import menuStore from "@/stores/MenuStore";
import { Typography } from "@mui/material";
import userStore from "@/stores/UserStore";
import AuthStore from "@/stores/AuthStore";

export default function Main() {
    const id = userStore.id;

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };

    const openPopup = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            stream.getTracks().forEach(track => track.stop());

            if (!AuthStore.token) {
                alert("로그인 후 이용해 주시길 바랍니다.");
                return handleMenuClick("login");
            }

            const response = await fetch(`http://localhost:8080/interview/checkpay?id=${id}`);
            const data = await response.json();
            console.log(data);

            if (data) {
                if (confirm("면접 연습을 시작하시겠습니까?")) {
                    await fetch(`http://localhost:8080/interview/minuspay?id=${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: id })
                    });
                    const width = 1650;
                    const height = 950;
                    const left = (window.innerWidth - width) / 2 + window.screenX;
                    const top = (window.innerHeight - height) / 2 + window.screenY;
                    localStorage.removeItem('interviewResults');
                    localStorage.removeItem('rand');
                    window.open('/interview/select', 'interview', `width=${width},height=${height},left=${left},top=${top}`);
                } else {
                    return;
                }
            } else {
                alert("이용권이 없습니다. 이용권 구매 페이지로 이동됩니다.");
                return handleMenuClick("payments");
            }
        } catch (error) {
            alert("카메라 또는 마이크 장치를 확인할 수 없습니다.");
        }
    };

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center mb-20 h-[80vh]">
                <div className="w-1/3 mt-10">
                    <Image src={bg} className="" alt="background image" />
                </div>
                <p className="text-3xl m-10 font-extrabold mpt-10">
                    인터뷰 닷으로 취업하자
                </p>
                <Typography onClick={openPopup}
                            className="bg-primary-500 text-white py-2 w-48 h-12 rounded-full font-bold hover:opacity-95 cursor-pointer text-center leading-8"
                >
                    바로 시작하기
                </Typography>
            </div>
        </>
    )
}
