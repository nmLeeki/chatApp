// 한국 시간을 반환하는 함수
export const getCurrentKoreanTime = () => {
  return new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
