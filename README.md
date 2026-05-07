# ytdlp

YouTube URL을 `wav`, `mp3`, `mp4`로 다운로드하는 간단한 도구입니다.

내부적으로 `yt-dlp`를 실행하고, 오디오/비디오 변환은 `ffmpeg`를 사용합니다.

## Google Colab 사용 방법

아래 Colab 노트북에서 바로 실행할 수 있습니다.

https://colab.research.google.com/drive/1CbUBzeVbKM3WEJJBfO8IzX1neauP894N?usp=sharing

자세한 순서는 `colab/README.md`를 참고하세요.

## macOS 사용 방법

Homebrew 기준:

```bash
brew install node yt-dlp ffmpeg
```

## Developer Setup

Node.js CLI를 직접 실행하려면 아래 프로그램이 필요합니다.

- Node.js LTS
- npm
- yt-dlp
- ffmpeg

확인:

```bash
node --version
npm --version
yt-dlp --version
ffmpeg -version
```

의존성 설치:

```bash
npm install
```

## Node CLI Usage

기본 포맷은 `wav`입니다.

```bash
npm run download "https://music.youtube.com/watch?v=..."
```

여러 URL:

```bash
npm run download "url1" "url2" "url3"
```

포맷별 명령:

```bash
npm run download:wav "url"
npm run download:mp3 "url"
npm run download:mp4 "url"
```

포맷별 여러 URL:

```bash
npm run download:wav "url1" "url2" "url3"
npm run download:mp3 "url1" "url2" "url3"
npm run download:mp4 "url1" "url2" "url3"
```

URL을 생략하면 `src/download-wav.ts`의 `defaultUrls` 목록을 사용합니다.

```bash
npm run download
```

## Scripts

```json
{
  "download": "tsx src/download-wav.ts --format wav",
  "download:wav": "tsx src/download-wav.ts --format wav",
  "download:mp3": "tsx src/download-wav.ts --format mp3",
  "download:mp4": "tsx src/download-wav.ts --format mp4"
}
```

## Output

다운로드 결과는 `downloads` 디렉터리에 저장됩니다.

파일명 형식:

```text
downloads/영상제목 [영상ID].확장자
```

같은 파일명이 이미 있으면 새 파일로 덮어씁니다.

## Implementation Notes

- CLI 엔트리포인트: `src/download-wav.ts`
- URL 인자 구분: 공백 기준
- 중복 URL은 실행 중 한 번만 처리
- `wav`, `mp3`: `yt-dlp -x --audio-format <format> -f ba`
- `mp4`: `yt-dlp -f bv*+ba/b --merge-output-format mp4`
- archive 파일은 사용하지 않음
