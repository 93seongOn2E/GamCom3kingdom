export const teaserVideos = [
  {
    id: "jz_WS2FtqT8",
    title: "감컴퍼니 삼국지서버 티저 영상",
    description: "위·촉·오 삼국쟁패의 막이 오르기 전, 서버 분위기를 먼저 확인하세요."
  }
];

export function getYoutubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}
