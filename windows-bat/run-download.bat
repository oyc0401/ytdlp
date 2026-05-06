@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "FORMAT=%~1"
if "%FORMAT%"=="" set "FORMAT=wav"

if /I not "%FORMAT%"=="wav" if /I not "%FORMAT%"=="mp3" if /I not "%FORMAT%"=="mp4" (
  echo 지원하지 않는 포맷입니다: %FORMAT%
  pause
  exit /b 1
)

set "APP_DIR=%~dp0"
set "YTDLP=%APP_DIR%yt-dlp.exe"
set "FFMPEG=%APP_DIR%ffmpeg.exe"

if not exist "%YTDLP%" (
  echo yt-dlp.exe 파일이 없습니다.
  pause
  exit /b 1
)

if not exist "%FFMPEG%" (
  echo ffmpeg.exe 파일이 없습니다.
  pause
  exit /b 1
)

echo.
echo YTDLP Downloader
echo 포맷: %FORMAT%
echo.
echo URL을 입력하세요.
echo 여러 개는 한 줄에 하나씩 입력하세요.
echo 입력이 끝나면 빈 줄에서 Enter를 누르세요.
echo.

set "URL_FILE=%TEMP%\ytdlp_urls_%RANDOM%%RANDOM%.txt"
if exist "%URL_FILE%" del "%URL_FILE%"

:read_url
set "URL="
set /p "URL=> "
if "%URL%"=="" goto urls_done
>>"%URL_FILE%" echo %URL%
goto read_url

:urls_done
if not exist "%URL_FILE%" (
  echo 입력된 URL이 없습니다.
  pause
  exit /b 1
)

echo.
echo 저장 폴더를 입력하세요.
echo 비워두면 이 폴더 안의 downloads 폴더에 저장됩니다.
set "OUTPUT_DIR="
set /p "OUTPUT_DIR=> "

if "%OUTPUT_DIR%"=="" set "OUTPUT_DIR=%APP_DIR%downloads"
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo.
echo 저장 위치: %OUTPUT_DIR%
echo 다운로드를 시작합니다.
echo.

set "PATH=%APP_DIR%;%PATH%"

if /I "%FORMAT%"=="mp4" (
  for /f "usebackq delims=" %%U in ("%URL_FILE%") do (
    echo ------------------------------------------------------------
    echo %%U
    "%YTDLP%" -f "bv*+ba/b" --merge-output-format mp4 --force-overwrites -o "%OUTPUT_DIR%\%%(title)s [%%(id)s].%%(ext)s" "%%U"
  )
) else (
  for /f "usebackq delims=" %%U in ("%URL_FILE%") do (
    echo ------------------------------------------------------------
    echo %%U
    "%YTDLP%" -x --audio-format "%FORMAT%" -f ba --force-overwrites -o "%OUTPUT_DIR%\%%(title)s [%%(id)s].%%(ext)s" "%%U"
  )
)

del "%URL_FILE%" >nul 2>nul

echo.
echo 완료되었습니다.
pause
