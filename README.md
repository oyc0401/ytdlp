# ytdlp

YouTube URL을 `wav`, `mp3`, `mp4`로 다운로드하는 간단한 도구입니다.

내부적으로 `yt-dlp`를 실행하고, 오디오/비디오 변환은 `ffmpeg`를 사용합니다.

## Windows 사용 방법

배포 파일:

```text
ytdlp-windows-bat.zip
```

GitHub에서 받는 방법:

1. 아래 주소로 들어갑니다.

```text
https://github.com/oyc0401/ytdlp/releases
```

2. 최신 Release를 엽니다.

3. `Assets` 항목에서 `ytdlp-windows-bat.zip`을 클릭해서 다운로드합니다.

사용 순서:

1. `ytdlp-windows-bat.zip` 파일을 다운로드합니다.

2. zip 파일 압축을 풉니다.

3. 압축을 푼 폴더 안에서 원하는 파일을 더블클릭합니다.

```text
download-wav.bat
download-mp3.bat
download-mp4.bat
```

4. 검은 창이 열리면 URL을 입력합니다.

5. 여러 개를 다운로드하려면 URL을 한 줄에 하나씩 입력합니다.

```text
https://www.youtube.com/watch?v=example1
https://www.youtube.com/watch?v=example2
https://www.youtube.com/watch?v=example3
```

6. URL 입력이 끝나면 아무것도 입력하지 않은 빈 줄에서 Enter를 누릅니다.

7. 저장 폴더를 입력합니다.

8. 저장 폴더를 비워두고 Enter를 누르면 같은 폴더 안의 `downloads` 폴더에 저장됩니다.

## macOS 사용 방법

macOS는 현재 개발자용 CLI 방식으로 실행합니다.

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

## Windows 배포본 만들기

`windows-bat` 폴더를 zip으로 압축하면 됩니다.

```bash
zip -r ytdlp-windows-bat.zip windows-bat
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
