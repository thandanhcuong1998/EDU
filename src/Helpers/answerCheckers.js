export const checkRadioAnswer = (correctAnswer, userAnswer) => {
   if (
      userAnswer &&
      userAnswer.length > 0 &&
      typeof userAnswer[0].index === 'number'
   ) {
      return correctAnswer === userAnswer[0].index;
   }
   console.error("Dữ liệu 'answer' không hợp lệ cho type 'radio'", userAnswer);
   return false;
};

export const checkCardWordAnswer = (
   correctAnswerData,
   userAnswer,
   arraysEqual
) => {
   if (Array.isArray(userAnswer) && Array.isArray(correctAnswerData)) {
      const submittedIndices = userAnswer
         .map(item => item.index + 1)
         .sort((a, b) => a - b);
      const correctIndices = [...correctAnswerData].sort((a, b) => a - b);
      return arraysEqual(submittedIndices, correctIndices);
   }
   console.error(
      "Dữ liệu 'answer' hoặc 'correctAnswerData' không hợp lệ cho type 'card-word-*'",
      userAnswer,
      correctAnswerData
   );
   return false;
};
