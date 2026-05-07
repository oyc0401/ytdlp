# Colab 사용 방법

Google Colab에서 YouTube URL을 `wav`, `mp3`, `mp4`로 다운로드하고 결과를 Google Drive에 저장하는 버전입니다.

## 실행 순서

1. Google Colab을 엽니다.
2. `colab/ytdlp_colab.ipynb` 파일을 업로드하거나 GitHub 저장소에서 엽니다.
3. 위에서부터 셀을 순서대로 실행합니다.
4. Google Drive 연결 권한을 허용합니다.
5. `URLS`, `FORMAT`, `DRIVE_OUTPUT_DIR` 값을 원하는 대로 바꾼 뒤 다운로드 셀을 실행합니다.

## 기본 저장 위치

```text
/content/drive/MyDrive/ytdlp-downloads
```

Drive에서는 아래 폴더로 보입니다.

```text
내 드라이브/ytdlp-downloads
```

## 포맷

- `wav`: 오디오를 WAV로 저장
- `mp3`: 오디오를 MP3로 저장
- `mp4`: 영상과 오디오를 MP4로 병합

## 주의

- Colab 런타임이 끊기면 설치 셀부터 다시 실행해야 합니다.
- 비공개 영상, 연령 제한 영상, 로그인 필요한 영상은 추가 쿠키 설정 없이는 실패할 수 있습니다.
- YouTube 및 각 사이트의 이용 약관과 저작권을 지켜서 사용하세요.
