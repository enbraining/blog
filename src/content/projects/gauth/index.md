---
title: "GAuth"
description: "광주소마고 통합 소셜 로그인"
date: "03/18/2024"
demoURL: "https://sms.msg-team.com/"
repoURL: "https://github.com/GSM-MSG/SMS-Backend"
---

## 프로젝트 요약

> AWS ECR, AWS EC2, Docker, Nginx

클라우드타입에서 AWS으로 마이그레이션을 맡았으며, 광주소프트웨어마이스터고에서 다양한 서비스들에 사용되는 통합 소셜 로그인 서비스입니다.

### MariaDB 인코딩 문제

기존 MariaDB 데이터를 AWS로 옮기는 과정에서 새로운 MariaDB 서버에 한글이 들어간 쿼리를 보내면 인코딩 문제가 발생했고, 기존의 형식과 같은 utf8mb4_unicode_ci으로 변경해주고 다시 쿼리 요청을 보내니 성공적으로 데이터를 옮길 수 있었습니다.
