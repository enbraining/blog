---
title: "GSM GOGO"
description: "체육대회 미니게임"
date: "03/18/2024"
demoURL: "https://sms.msg-team.com/"
repoURL: "https://github.com/GSM-MSG/SMS-Backend"
---

## 프로젝트 요약

> Docker, Github Actions, AWS EC2, Spring Batch, Multi Module

체육대회를 재밌게 즐기기 위해서 미니게임, 경기 알림 등의 기능이 포함된 프로젝트를 개발했습니다.

> 2024.08 - 2024.10

### 배치 작업

GOGO에선 응원할 팀을 하나씩 정할 수 있습니다. 자신이 응원하는 팀의 경기가 있다면 10분 전에 미리 메시지로 공지해주는 기능을 Spring Batch와 CoolSMS를 사용해서 개발했습니다.

[🔁 경기 10분 전 알림](https://github.com/GSM-GOGO/gsmgogo-server-v2/pull/164)

전화번호 인증을 구현하기 위해서 사용한 CoolSMS는 메시지 1건당 요금이 발생하기 때문에 인증 횟수를 저장해야만 했습니다. 이러한 인증 횟수를 자정마다 초기화하는 기능을 구현하기 위해서 Spring Batch를 사용했습니다.

[🔁 스프링 배치 설정 및 정각에 실행되는 Job 추가](https://github.com/GSM-GOGO/gsmgogo-server-v2/pull/58)

### 멀티 모듈

API, Entity, Batch로 기능을 세가지로 분류해서 멀티 모듈로 구성하였습니다. 이를 통해 유지보수가 더 쉽고, 느슨한 결합을 만들 수 있었습니다.
