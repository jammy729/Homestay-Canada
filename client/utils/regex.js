export default function detectStringType(input) {
  const numberRegex = /^\d+$/;
  const letterRegex = /^[a-zA-Z\s]+$/;

  if (numberRegex.test(input)) {
    return `$${input}`;
  } else if (letterRegex.test(input)) {
    return `${input}`;
  } else {
    return "연락주세요";
  }
}
