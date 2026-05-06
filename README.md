# ytdlp

YouTube URL을 `wav`, `mp3`, `mp4`로 다운로드하는 간단한 Node.js CLI입니다.

내부적으로 `yt-dlp`를 실행하고, 오디오/비디오 변환은 `ffmpeg`를 사용합니다.

## Requirements

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

## Install Dependencies

```bash
npm install
```

## External Tool Setup

### Windows 10

Node.js:

- https://nodejs.org/
- LTS 설치 파일을 받아 기본 옵션으로 설치

yt-dlp:

- https://github.com/yt-dlp/yt-dlp/releases/latest
- `yt-dlp.exe` 다운로드
- `C:\Tools\yt-dlp.exe`에 배치

ffmpeg:

- https://www.gyan.dev/ffmpeg/builds/
- `ffmpeg-release-essentials.zip` 다운로드
- 압축 해제 후 `bin\ffmpeg.exe`를 `C:\Tools\ffmpeg.exe`에 배치

PATH:

- Windows 검색에서 `환경 변수` 실행
- `시스템 환경 변수 편집` → `환경 변수`
- `시스템 변수` → `Path` → `편집`
- `C:\Tools` 추가
- PowerShell을 새로 열고 버전 확인

```powershell
node --version
npm --version
yt-dlp --version
ffmpeg -version
```

### macOS

Homebrew 기준:

```bash
brew install node yt-dlp ffmpeg
```

## Usage

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
