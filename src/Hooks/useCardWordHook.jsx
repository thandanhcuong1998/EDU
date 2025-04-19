import { useEffect, useState } from 'react';

const useCardWordHook = (handleAnswer, type) => {
    const [listAnswer, setListAnswer] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);

    // use effect
    useEffect(() => {
        return () => {
            setListAnswer([]);
        };
    }, [type]);

    useEffect(() => {
        handleAnswer(listAnswer);
    }, [listAnswer]);

    const onHandleAnswer = (value, index) => {
        // Kiểm tra xem đã có câu trả lời nào với index này chưa
        if (!listAnswer.some(element => element.index === index)) {
            setListAnswer(prev => [...prev, { answer: value, index: index }]); // Thêm phần tử mới
        }
    };

    const removeAnswer = index => {
        if (!isDragging) {
            setListAnswer(prev =>
                prev.filter(element => element.index !== index)
            ); // Lọc bỏ phần tử
            handleAnswer(listAnswer);
        }
    };

    const handleDragStart = index => {
        setDraggedItemIndex(index);
        setIsDragging(true);
    };

    const handleDrop = index => {
        if (draggedItemIndex !== null && draggedItemIndex !== index) {
            setListAnswer(prev => {
                const newItems = [...prev];
                const draggedItem = newItems[draggedItemIndex];

                // Hoán đổi vị trí
                newItems[draggedItemIndex] = newItems[index];
                newItems[index] = draggedItem;

                return newItems; // Trả về danh sách mới
            });
        }
        setIsDragging(false);
        setDraggedItemIndex(null);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedItemIndex(null);
        handleAnswer(listAnswer);
    };

    const handleDragOver = e => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định để cho phép thả
    };

    return {
        listAnswer,
        onHandleAnswer,
        removeAnswer,
        handleDragStart,
        handleDrop,
        handleDragEnd,
        handleDragOver,
    };
};

export default useCardWordHook;
