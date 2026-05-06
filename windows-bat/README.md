# Windows 배치파일 버전

설치 없이 압축을 풀고 `.bat` 파일을 실행하는 방식입니다.

## 포함 파일

```text
download-wav.bat
download-mp3.bat
download-mp4.bat
run-download.bat
yt-dlp.exe
ffmpeg.exe
```

## 사용법

원하는 포맷의 파일을 더블클릭합니다.

```text
download-wav.bat
download-mp3.bat
download-mp4.bat
```

URL을 입력합니다.

여러 개를 받을 때는 한 줄에 하나씩 입력합니다.

입력이 끝나면 빈 줄에서 Enter를 누릅니다.

저장 폴더를 입력합니다.

비워두고 Enter를 누르면 `downloads` 폴더에 저장됩니다.

## 배포

`windows-bat` 폴더를 zip으로 압축해서 전달하면 됩니다.

사용자는 zip을 풀고 `.bat` 파일을 더블클릭하면 됩니다.
