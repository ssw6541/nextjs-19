-- schema.sql 을 실행한 뒤, Supabase SQL Editor 에서 이 파일을 실행하세요. (여러 번 실행해도 안전)

-- 1) 프로필 항목 추가 (모두 선택 입력)
alter table public.profiles
  add column if not exists school text,
  add column if not exists department text,
  add column if not exists gender text,
  add column if not exists hobby text,
  add column if not exists specialty text,
  add column if not exists onboarded boolean not null default false;

alter table public.profiles drop constraint if exists profiles_gender_check;
alter table public.profiles
  add constraint profiles_gender_check
  check (gender is null or gender in ('male', 'female', 'other'));

-- 2) 본인 프로필 행 생성 허용 (행이 아직 없는 기존 회원용)
drop policy if exists "본인 프로필 생성" on public.profiles;
create policy "본인 프로필 생성" on public.profiles
  for insert with check (auth.uid() = id);

-- 3) 아바타 저장소 (공개 읽기, 본인 폴더에만 쓰기)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152,
        array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = true,
      file_size_limit = 2097152,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "아바타 공개 조회" on storage.objects;
create policy "아바타 공개 조회" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "본인 아바타 업로드" on storage.objects;
create policy "본인 아바타 업로드" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "본인 아바타 수정" on storage.objects;
create policy "본인 아바타 수정" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "본인 아바타 삭제" on storage.objects;
create policy "본인 아바타 삭제" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- 4) 회원 탈퇴: 로그인한 본인 계정만 삭제 (profiles 는 on delete cascade 로 함께 삭제)
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
