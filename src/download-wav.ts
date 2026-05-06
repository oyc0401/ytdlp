import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

type MediaFormat = "wav" | "mp3" | "mp4";

const defaultUrls = [
  "https://music.youtube.com/watch?v=AH9unln1QCU&si=SknWIr04xr7VVh-4"
];

const outputDir = path.resolve("downloads");

fs.mkdirSync(outputDir, { recursive: true });

async function main() {
  const { format, urls } = parseArgs(process.argv.slice(2));
  const uniqueUrls = [...new Set(urls)];

  if (uniqueUrls.length === 0) {
    console.error("다운로드할 URL이 없습니다.");
    process.exit(1);
  }

  console.log(`총 URL 수: ${urls.length}`);
  console.log(`중복 제거 후 URL 수: ${uniqueUrls.length}`);
  console.log(`다운로드 포맷: ${format}`);
  console.log(`저장 위치: ${outputDir}`);

  for (const [index, url] of uniqueUrls.entries()) {
    console.log("\n------------------------------");
    console.log(`[${index + 1}/${uniqueUrls.length}] 다운로드 시작`);
    console.log(url);

    const code = await downloadMedia(url, format);

    if (code === 0) {
      console.log(`[${index + 1}/${uniqueUrls.length}] 완료`);
    } else {
      console.error(`[${index + 1}/${uniqueUrls.length}] 실패, 종료 코드: ${code}`);
    }
  }

  console.log("\n전체 작업 완료");
}

function parseArgs(args: string[]): { format: MediaFormat; urls: string[] } {
  let format: MediaFormat = "wav";
  const urlArgs: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--format") {
      const nextArg = args[index + 1];

      if (nextArg !== "wav" && nextArg !== "mp3" && nextArg !== "mp4") {
        console.error("지원하는 포맷은 wav, mp3, mp4입니다.");
        process.exit(1);
      }

      format = nextArg;
      index += 1;
      continue;
    }

    urlArgs.push(arg);
  }

  const urls =
    urlArgs.length === 0
      ? defaultUrls
      : urlArgs
          .flatMap((arg) => arg.split(","))
          .map((url) => url.trim())
          .filter(Boolean);

  return { format, urls };
}

function downloadMedia(
  url: string,
  format: MediaFormat,
): Promise<number> {
  return new Promise((resolve) => {
    const args =
      format === "mp4"
        ? [
            // 최고 화질 영상과 최고 음질 오디오를 받아 mp4로 병합
            "-f",
            "bv*+ba/b",
            "--merge-output-format",
            "mp4",
          ]
        : [
            "-x",
            "--audio-format",
            format,

            // 최고 음질 오디오 선택
            "-f",
            "ba",
          ];

    args.push(
      // 같은 파일명이 있으면 새로 받은 파일로 덮어쓰기
      "--force-overwrites",

      // 파일명: downloads/영상제목 [영상ID].확장자
      "-o",
      path.join(outputDir, "%(title)s [%(id)s].%(ext)s"),

      url,
    );

    const child = spawn("yt-dlp", args, {
      stdio: "inherit",
    });

    child.on("error", (error) => {
      console.error("yt-dlp 실행 실패:", error.message);
      console.error("설치 예시: brew install yt-dlp ffmpeg");
      resolve(1);
    });

    child.on("close", (code) => {
      resolve(code ?? 1);
    });
  });
}

main();
