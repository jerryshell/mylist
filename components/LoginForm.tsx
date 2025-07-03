"use client";

import { sendEmailOtp, verifyOtp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoadingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6 animate-spin"
  >
    <path
      fillRule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
      clipRule="evenodd"
    />
  </svg>
);

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");

  const router = useRouter();

  const handleSendEmailOtpBtnClick = async () => {
    if (!email) {
      setErrorMessage("电子邮箱不能为空");
      return;
    }

    setIsPending(true);
    setErrorMessage("");

    const userId = await sendEmailOtp(email)
      .catch((e) => {
        console.error("Error sendEmailOtp", e);
        setErrorMessage("发送邮箱验证码失败，请稍后重试");
      })
      .finally(() => setIsPending(false));

    if (userId) {
      setUserId(userId);
    }
  };

  const handleSendCodeBtnClick = async () => {
    if (!code) {
      setErrorMessage("验证码不能为空");
      return;
    }

    setIsPending(true);
    setErrorMessage("");

    const sessionId = await verifyOtp(userId, code)
      .catch((e) => {
        console.error("Error verifyOtp", e);
        setErrorMessage("验证码校验失败");
      })
      .finally(() => setIsPending(false));

    if (sessionId) {
      router.push("/");
    }
  };

  return (
    <div className="flex w-2xl flex-col justify-center gap-2">
      <h1 className="text-4xl font-bold text-neutral-800">登录</h1>

      {userId ? (
        <>
          <p className="text-neutral-600">
            一封验证邮件已经发送至：
            <span className="text-primary font-semibold">{email}</span>
          </p>
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="text"
              placeholder="请输入验证码"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary"
            onClick={handleSendCodeBtnClick}
            disabled={isPending}
          >
            提交验证码 {isPending && <LoadingIcon />}
          </button>
        </>
      ) : (
        <>
          <p className="text-neutral-600">首次登录将自动创建账号</p>
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              name="email"
              type="email"
              placeholder="mail@site.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary"
            onClick={handleSendEmailOtpBtnClick}
            disabled={isPending}
          >
            发送验证码 {isPending && <LoadingIcon />}
          </button>
        </>
      )}

      {errorMessage && (
        <p className="text-primary mx-auto w-fit rounded-xl bg-red-100 px-8 py-4 text-center text-sm">
          *{errorMessage}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
