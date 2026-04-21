# 프론트엔드 하드코딩 제거 및 백엔드 기반 보안 아키텍처 지시서

현재 `app.js`에 PIN 번호('0501', '0000')가 하드코딩되어 있어 GitHub 노출 및 보안 취약점이 존재합니다. 비밀번호 검증 책임을 100% 백엔드(Cloudflare Functions)로 위임하는 구조로 전면 리팩토링하세요.

## 1. 백엔드: 검증 API 신설 (`functions/api/verify-pin.js`)
- **새 API 생성:** 클라이언트가 보낸 `pin` 값을 검증하는 엔드포인트를 만드세요.
- **환경변수 매핑:** Cloudflare 환경변수 `env.ADMIN_PIN` (기본: 0501)과 `env.READONLY_PIN` (기본: 0000)을 참조하세요. (코드 내에 숫자 하드코딩 절대 금지)
- **로직:**
  - `pin === env.ADMIN_PIN` 이면 `status: 200, JSON: { role: 'admin' }` 반환
  - `pin === env.READONLY_PIN` 이면 `status: 200, JSON: { role: 'readonly' }` 반환
  - 둘 다 아니면 `status: 401 Unauthorized` 반환

## 2. 프론트엔드: 하드코딩 제거 및 인증 로직 수정 (`app.js`)
- **하드코딩 삭제:** `app.js` 내부의 모든 `0501`, `0000` 텍스트를 완벽히 삭제하세요.
- **로그인 로직 변경:** 
  - 사용자가 로그인 게이트에서 PIN을 입력하면, `/api/verify-pin`으로 `POST` 요청(또는 쿼리스트링)을 보냅니다.
  - 서버 응답이 `200`이고 `role: 'admin'`이면, `localStorage.setItem('DONNAGA_PIN', 입력한값)` 및 `DONNAGA_ROLE = 'admin'`을 저장하고 앱을 시작합니다.
  - 서버 응답이 `role: 'readonly'`면, UI에서 입력/수정/삭제 버튼을 모두 숨깁니다.
  - 서버 응답이 `401`이면 "비밀번호가 틀렸습니다"를 띄웁니다.

## 3. 동기화 API 보안 강화 (`functions/api/sync.js`)
- 기존에 `env.SECRET_PIN` 하나만 쓰던 로직을 버리고, `POST`(쓰기/수정/삭제) 요청이 들어올 때 클라이언트가 보낸 `pin`이 반드시 `env.ADMIN_PIN`과 일치할 때만 D1 DB 조작을 허용하세요. 일치하지 않으면 무조건 `401`을 반환합니다.

## 4. 클라우드플레어 환경변수 (개발자 세팅 안내)
- 대시보드에 `ADMIN_PIN=0501`, `READONLY_PIN=0000` 두 개를 등록할 것입니다.
