"use client";

import { sendEmailOtp, verifyOtp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
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
            提交验证码
            {isPending && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
        </>
      ) : (
        <>
          <p className="text-neutral-600">首次登录将自动创建账号</p>
          <label className="input w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
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
            发送验证码
            {isPending && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
        </>
      )}

      {errorMessage && (
        <p className="text-primary bg-primary/10 mx-auto w-fit rounded-xl px-8 py-4 text-center text-sm">
          *{errorMessage}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
