export const formatText = (text: string) => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formattedText = formattedText.replace(/\*(.*?)\*/g, "<li>$1</li>");
  formattedText = formattedText.replace(/\n/g, "<br />");
  formattedText = formattedText.replace(
    /```([\s\S]*?)```/g,
    "<pre><code>$1</code></pre>"
  );
  return formattedText;
};
