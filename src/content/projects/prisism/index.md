---
title: "Prisism"
description: "랜덤채팅"
date: "03/18/2024"
demoURL: "https://prisism.com/"
repoURL: "https://github.com/xolving/prisism-backend"
---

## 프로젝트 요약

누구나 사용할 수 있는 랜덤채팅 서비스로 안정적인 소켓 연결성과 아키텍쳐링을 목적으로 개발한 토이 프로젝트입니다.

> 2024.06 - 2024.06

### 불안정안 웹소켓 연결

상대방과 매칭이 되었음에도 약 30초가 지나면 연결이 끊기는 현상이 발생했습니다. 검색해본 결과, 요청이 계속 발생하지 않으면 자동으로 소켓이 닫힌다는 것을 알게되어 스케쥴을 통해 핑 메시지를 보내도록 변경하였습니다.

[♻️ PING 전송을 백엔드로 이동](https://github.com/xolving/prisism-backend/commit/d46c6d77d9e2d560437181ee82972bf70cd23c8d)

### 유저 수 새로고침

사이트에 표시되는 이용자 수가 브라우저 새로고침을 통해서만 바뀌는 문제가 발생하여, SWR을 사용해서 채팅 도중에도 유저 수를 주기적으로 새로고침될 수 있도록 적용하였습니다.

[♻️ SWR로 주기적으로 유저수를 가져옴](https://github.com/xolving/prisism-frontend/commit/238766ca64b2cc406f01bad373a2b686881a8fdb)

### Nginx와 SSL

Nginx 프록시와 Certbot를 사용해서 SSL 인증제를 발급하여 HTTPS 프로토콜을 사용할 수 있도록 하였습니다.

### 프리티어 최대한 활용하기

EC2 프리티어는 메모리가 1GB로 작아서 웹소켓 연결이 늘어날수록 반응을 못하는 현상이 발생하였습니다. 따라서 메모리 스와핑을 통해 가상 메모리를 포함시켜 3GB로 사용할 수 있도록 하였습니다.
