# 🍀 1943 클래식 리뉴얼 프로젝트

리액트 심화주차 아웃소싱 프로젝트로 1943 주점의 사이트를 리뉴얼 했어요<br />
백엔드는 supabase를 이용했어요<br/><br/>

## 0. 팀원 소개

![송별회](https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/c6a75790-52e6-41ef-a788-a7e9e12c1b79)

<table>
   <tr>
    <td align="center"><b>남현재</b></td>
    <td align="center"><b>이예린</b></td>
    <td align="center"><b>임다은</b></td>
    <td align="center"><b>강동석</b></td>
    <td align="center"><b>김운성</b></td>
    <td align="center"><b>전인화</b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/NHJeans"><img src="https://avatars.githubusercontent.com/u/110883544?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/1eeyerin"><img src="https://avatars.githubusercontent.com/u/40863185?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/pitapat428"><img src="https://avatars.githubusercontent.com/u/167290167?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/show1486"><img src="https://avatars.githubusercontent.com/u/153741544?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/host2024"><img src="https://avatars.githubusercontent.com/u/166719050?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/jeoninhwa3"><img src="https://avatars.githubusercontent.com/u/75258514?v=4" width="100px" /></a></td>
  </tr>
  <tr>
    <td align="center">프로젝트 세팅,<br/>메뉴소개 페이지,<br/>반응형</td>
    <td align="center">디자인,<br/>고객의소리(cud),<br/>시스템 컴포넌트</td>
    <td align="center">메인 페이지</td>
    <td align="center">고객의 소리(r)</td>
    <td align="center">지도 페이지</td>
    <td align="center">지도 페이지<br/>시스템 컴포넌트</td>
  </tr>
</table>

- 각자 맡은 역할을 다한 뒤에도, 다른 팀원의 작업을 도와주면서 완성했어요 🌟 <br/><br/>

## 0-1. 프로젝트 진행 기간

- 2024.06.17 ~ 2024.06.21<br/><br/>

## 0-2. 프로젝트 중에는..
<img width="493" alt="image" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/8a1ad3a3-71e8-49c1-88eb-48dbe9ed4eba">
<br/>

- 💬 활발하게 진행 상황을 공유하기 위해 zep과 slack을 사용했어요
- 💬 코드리뷰하는 문화를 지향해요
- 💬 pr에 1명 이상의 approve가 있어야 develop에 merge를 할 수 있도록 설정했어요
  <br/><br/>

## 1. 사용한 라이브러리

### tanstack-query

서버 상태 관리를 관리 하기 위해 사용하였으며, 비동기 로직을 간편하게 작성하기 위해 사용했어요

### supabase

Supabase를 백엔드로 사용하여 실시간 데이터베이스를 사용했어요

### react-router-dom

React Router를 사용하여 SPA의 라우팅을 관리했어요

### styled-components

CSS-in-JS 라이브러리인 Styled Components를 사용하여 컴포넌트 스타일링을 했어요

### swiper

모바일 및 웹에서 캐러셀 UI를 편리하게 사용하기 위해 사용했어요

### react-intersection-observer

스크롤 이벤트를 감지하고, 뷰포트에 들어오는 요소를 처리하는 로직을 구현했어요, 이를 통해 지연 로딩(lazy loading)과 같은 최적화 기능을 쉽게 적용했어요

### lodash

Lodash를 사용하여 배열, 객체 등의 데이터 조작을 효율적으로 처리하고, 다양한 유틸리티 함수를 통해 코드의 가독성과 재사용성을 높였어요

<br/>

## 2. 대표기능

- [x] 1943의 대표 메뉴를 볼 수 있어요<br />
- [x] 메뉴를 카테고리에 맞게 필터링하여 볼 수 있어요<br />
- [x] 1943 매장의 위치를 한눈에 확인할 수 있어요<br />
- [x] 고객의 소리를 남길 수 있어요<br />

<br />

## 3. 상세설명

### 1. Swiper를 이용한 메인페이지 구현
<img width="640" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/7a7a88a5-2ecd-44bb-9f67-b872b1174af9"/><br/>

- 1943의 대표적인 내용을 한눈에 볼 수 있어요
- `Swiper`와 내장 모듈인 `Mousewheel`를 사용하여 fullpage UI를 구현했어요<br/><br/>

### 2. 카카오맵 API를 이용한 매장찾기 구현
<img width="640" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/c3277e05-608e-43d4-a7c9-95e2f725dfb4"/><br/>

- 1943의 매장 위치를 빠르게 찾을 수 있어요
- 원하는 매장을 쉽고 빠르게 검색할 수 있어요
- `lodash`의 debounce 함수를 사용하여 사용성을 높였어요<br/><br/>

### 3. 메뉴소개 페이지 구현
<img width="640" align="top" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/16517438-2cfb-427a-b307-cc5d6f870ba4"/><br /><br />
<img width="215" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/d252d5d0-a243-47fc-bc83-62992207126a"/><br/><br/>

- 1943의 대표 메뉴를 볼 수 있어요
- 카테고리 별로 구분해서 볼 수 있어요
- `react-intersection-observer`를 사용하여 더욱 빠르게 볼 수 있어요<br/><br/>

### 4. 고객의 소리 CRUD 구현
<img width="640" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/2bfd43b6-3828-42db-bfaa-3137545f2c0d"/><br/>
- 고객이 올린 게시글을 볼 수 있어요

<img width="640" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/209165fb-d285-440e-a994-a3a67cccb1a2"/><br/>
- 비회원도 자유롭게 글을 작성할 수 있어요

<img width="640" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/6308ec4d-a55e-488a-acd8-bb19456eebde"/><br/>
- 작성할때 입력했던 비밀번호를 입력해야 볼 수 있어요
- 수정과 삭제는 본인만 할 수 있어요

<img width="640" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/8bf86171-c9b6-41da-80e5-8c43e9a64508"/><br/>

- 수정 페이지에서 새로고침을 하거나, 잘못된 경로로 접근한 경우 에러 UI를 보여줬어요<br/><br/>

### 5. 반응형 UI 지원
<img width="640" align="top" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/d5398e1f-8b17-4b68-8340-82a2a61fac25"/><br /><br />
<img width="225" src="https://github.com/LuckyBicky-Team/Outsourcing-project/assets/40863185/14caf030-175f-4df5-9fe4-b3be03893f0d"/><br/><br/>

- 반응형 UI를 지원해요
- 어디에서든 최적화 된 화면으로 볼 수 있어요<br/><br/>
