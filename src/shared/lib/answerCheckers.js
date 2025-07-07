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
      // Get the user's answer sequence by mapping their selected words to the original indices.
      const submittedIndices = userAnswer.map(item => item.index);
      
      // The correct answer data is already in the correct order.
      const correctIndices = correctAnswerData;

      // Directly compare the user's sequence with the correct sequence.
      return arraysEqual(submittedIndices, correctIndices);
   }
   console.error(
      "Dữ liệu 'answer' hoặc 'correctAnswerData' không hợp lệ cho type 'card-word-*'",
      userAnswer,
      correctAnswerData
   );
   return false;
};
