import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AppendCard from "../AppendCard";

export default function DateAccordion({ dateLength, selectedItems, setSelectedItems, setSelectedIndex }) {
    const [expanded, setExpanded] = useState("panel0");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        const index = panel.slice(-1);
        setSelectedIndex(index);
    };

    // 생성할 Accordion의 개수
    const numberOfAccordions = dateLength;
    const dateCards = [];

    for (let i = 0; i < dateLength; i++) {
        dateCards.push([]); // 각 날짜에 대한 빈 배열 생성
    }

    for (let i = 0; i < dateLength; i++) {
        const cardProps = {
            selectedItems: selectedItems[i] || [], // 빈 배열을 기본값으로 설정
            day: i + 1,
            setSelectedItems: setSelectedItems,
        };

        const cardsForDate = [];
        cardsForDate.push(<AppendCard key={i} item={dateCards} {...cardProps} />);
        dateCards[i] = cardsForDate; // 해당 날짜의 배열에 카드 추가
    }

    // dateLength가 5를 초과하면 null 반환, 그 외에는 Accordion 랜더링
    if (dateLength > 5) {
        return null;
    }

    const accordions = [];
    for (let i = 0; i < numberOfAccordions; i++) {
        accordions.push(
            <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                <AccordionSummary
                    aria-controls={`panel${i}d-content`}
                    id={`panel${i}d-header`}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>DAY {i + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                    {/* 각 아코디언에 해당하는 AppendCard를 동적으로 생성하여 렌더링 */}
                    {dateCards[i]}
                </AccordionDetails>
            </Accordion>
        );
    }

    return <div>{accordions}</div>;
}
