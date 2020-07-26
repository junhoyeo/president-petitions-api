<a href="https://github.com/junhoyeo/president-petitions-api">
  <img src="./docs/images/logo.png" align="right" width="112" height="131" />
</a>

# 🇰🇷 API Wrapper / API Client for President Petitions

> [청와대 국민청원](https://www1.president.go.kr/petitions) 서비스에서 청원 목록과 정보를 불러오는 것을 도와주는 API 래퍼입니다.

## API

### GET /v0/petition
> 청원 목록을 불러옵니다.

#### Request

##### Query parameters

| 필드명 | 타입 | 설명 | 필수 여부 |
| - | - | - | :-: |
| `page` | `string` | 페이지 번호 | ❌(기본값 `1`) |
| `ranked` | `string` | `true`일 때 추천순으로 정렬 | ❌(기본값 `false`) |

#### Response

```json
{
  "currentPage": 1,
  "totalPetitions": 1015,
  "petitions": [
    {
      "id": 590341,
      "number": 1015,
      "title": "응급환자가 있는 구급차를 막아세운 택시 기사를 처벌해 주세요.",
      "category": "안전/환경",
      "provider": "naver",
      "agreementCount": 724247,
      "createdAt": "2020-07-03",
      "finishedAt": "2020-08-02"
    }
  ]
}
```

### GET /v0/petition/:petitionID
> `petitionID`를 가지는 청원에 대한 정보를 불러옵니다.

#### Request

##### URL parameters

| 필드명 | 타입 | 설명 | 필수 여부 |
| - | - | - | :-: |
| `petitionID` | `string` | 페이지 ID | ⭕️ |

#### Response

```json
{
  "id": 590341,
  "status": "청원진행중",
  "title": "응급환자가 있는 구급차를 막아세운 택시 기사를 처벌해 주세요.",
  "agreementCount": 724248,
  "information": {
    "category": "안전/환경",
    "createdAt": "2020-07-03",
    "finishedAt": "2020-08-02"
  },
  "article": "2020년 6월 8일 월요일 오후 3시 15분\n오후 3시 15분경..."
}
```
