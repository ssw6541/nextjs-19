"use client";

import { useActionState, useRef, useState } from "react";
import {
  deleteAccountAction,
  removeAvatarAction,
  saveProfileAction,
  skipOnboardingAction,
  uploadAvatarAction,
  type ProfileState,
} from "@/app/actions/profile";
import Avatar from "./Avatar";

const initial: ProfileState = {};
const input =
  "h-13 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

function Status({ state }: { state: ProfileState }) {
  if (state.error)
    return (
      <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
        {state.error}
      </p>
    );
  if (state.message)
    return (
      <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
        {state.message}
      </p>
    );
  return null;
}

export function AvatarForm({
  avatarUrl,
  name,
}: {
  avatarUrl: string | null;
  name: string | null;
}) {
  const [upState, upAction, upPending] = useActionState(uploadAvatarAction, initial);
  const [rmState, rmAction, rmPending] = useActionState(removeAvatarAction, initial);
  const [preview, setPreview] = useState<string | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setClientError(null);
    if (!f) return setPreview(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type))
      return (setClientError("JPG, PNG, WEBP 이미지만 올릴 수 있습니다."), setPreview(null), (e.target.value = ""));
    if (f.size > 2 * 1024 * 1024)
      return (setClientError("이미지는 2MB 이하여야 합니다."), setPreview(null), (e.target.value = ""));
    setPreview(URL.createObjectURL(f));
  }

  const state = clientError ? { error: clientError } : upState.error || upState.message ? upState : rmState;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      <Avatar src={preview ?? avatarUrl} name={name} size={104} />
      <div className="w-full space-y-3">
        <form action={upAction} className="flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            name="avatar"
            accept="image/jpeg,image/png,image/webp"
            onChange={onPick}
            className="max-w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-black/10"
          />
          <button
            disabled={upPending || !preview}
            className="h-10 rounded-lg bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-40"
          >
            {upPending ? "업로드 중..." : "사진 변경"}
          </button>
        </form>
        {avatarUrl && (
          <form action={rmAction}>
            <button disabled={rmPending} className="text-sm text-foreground/50 underline hover:text-red-600">
              {rmPending ? "삭제 중..." : "사진 삭제"}
            </button>
          </form>
        )}
        <p className="text-xs text-foreground/50">JPG · PNG · WEBP, 최대 2MB</p>
        <Status state={state} />
      </div>
    </div>
  );
}

type Values = {
  name: string;
  school: string;
  department: string;
  gender: string;
  hobby: string;
  specialty: string;
};

function Field({ label, ...p }: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label} <span className="font-normal text-foreground/40">(선택)</span>
      </span>
      <input {...p} className={input} />
    </label>
  );
}

export function InfoForm({ values, onboarded }: { values: Values; onboarded: boolean }) {
  const [state, action, pending] = useActionState(saveProfileAction, initial);

  return (
    <div>
      <form action={action} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">이름 (표시 이름)</span>
          <input name="name" defaultValue={values.name} maxLength={50} className={input} placeholder="홍길동" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="학교" name="school" defaultValue={values.school} maxLength={50} placeholder="○○대학교" />
          <Field label="학과" name="department" defaultValue={values.department} maxLength={50} placeholder="○○학과" />
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">
            성별 <span className="font-normal text-foreground/40">(선택)</span>
          </span>
          <select name="gender" defaultValue={values.gender} className={input}>
            <option value="">선택 안 함</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
        </label>
        <Field label="취미" name="hobby" defaultValue={values.hobby} maxLength={100} placeholder="독서, 등산 ..." />
        <Field label="특기" name="specialty" defaultValue={values.specialty} maxLength={100} placeholder="기타 연주, 영상 편집 ..." />
        <Status state={state} />
        <button
          disabled={pending}
          className="h-13 w-full rounded-2xl bg-brand text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg disabled:opacity-60"
        >
          {pending ? "저장 중..." : "저장하기"}
        </button>
      </form>
      {!onboarded && (
        <form action={skipOnboardingAction} className="mt-3">
          <button className="h-11 w-full rounded-lg border border-black/15 text-sm text-foreground/70 transition hover:bg-black/[.03]">
            나중에 입력할게요
          </button>
        </form>
      )}
    </div>
  );
}

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState(deleteAccountAction, initial);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-foreground/50 underline hover:text-red-600"
      >
        회원 탈퇴
      </button>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-700">
        <p className="font-bold">정말 탈퇴하시겠어요?</p>
        <ul className="mt-1 list-disc pl-5">
          <li>계정과 프로필 정보, 프로필 사진이 모두 삭제됩니다.</li>
          <li>삭제된 정보는 복구할 수 없습니다.</li>
        </ul>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">
          확인을 위해 <b className="text-red-600">탈퇴</b> 를 입력해주세요.
        </span>
        <input
          name="confirm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoComplete="off"
          className={input}
          placeholder="탈퇴"
        />
      </label>
      <Status state={state} />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setText("");
          }}
          className="h-11 flex-1 rounded-lg border border-black/15 text-sm hover:bg-black/[.03]"
        >
          취소
        </button>
        <button
          disabled={pending || text.trim() !== "탈퇴"}
          className="h-11 flex-1 rounded-lg bg-red-600 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-40"
        >
          {pending ? "처리 중..." : "회원 탈퇴"}
        </button>
      </div>
    </form>
  );
}
