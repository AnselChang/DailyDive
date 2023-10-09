import { FC, useState } from "react";
import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { Link } from "react-router-dom";
import { UserHabit } from "../../../../models";
import PercentIcon from "../shared-components/percent-icon";

interface HabitInfoProps {
    habitInfo: UserHabit;
}

const MainDivStyle = styled.div
`
display: flex;
justify-content: space-between;
font-family: ${FONT_THEME.MAIN_FONT};
background-color: ${COLOR_THEME.SECTION};
color: white;
padding: 10px;
margin: 10px;
`

const HabitTitleStyle = styled.h1
`
padding-left: 10px;
display: inline-block;
margin-right: 15px;
transform: translateY(5px);
`

const HabitStreakStyle = styled.img
`
display: inline-block;
width: 2em;
height: 2em;
transform: translateY(-2px);
`
const HabitStreakTextStyle = styled.p<{isHighStreak: boolean}>
`
display: inline-block;
transform: translate(-20px,-1px);

${(props) =>
    props.isHighStreak &&
    `
    transform: translate(-25px,-1px);
    `}
`

const HabitDescriptionStyle = styled.div
`
cursor: pointer;
width: fit-content;
padding-left: 10px;
transition: background-color 0.3s;

&:hover {
    background-color: ${COLOR_THEME.SUBSECTION}
}
`

const EditableDescription = styled.textarea
`
width: 100%;
resize: none;
margin-left: 8px;
`
const HabitInfoRightSide = styled.div
`
padding-right: 10px;
`

const HabitInfoComponent: FC<HabitInfoProps> = ({ habitInfo }) => {
    const [isDescriptionEditing, setDescriptionEditing] = useState(false);
    const [description, setDescription] = useState(habitInfo.description);
    const displayStreak = habitInfo.currentStreak >= 1;
    const isHighStreak = habitInfo.currentStreak > 9;

    const handleDescriptionClick = () => {
        setDescriptionEditing(true);
      };
    
      const handleDescriptionBlur = () => {
        setDescriptionEditing(false);
      };
    
      const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
      };

    return(
        <MainDivStyle className="rounded">
            <div>
                <HabitTitleStyle>{habitInfo.name}</HabitTitleStyle>
                {displayStreak && (
                    <>
                    <HabitStreakStyle src="/fire.svg"></HabitStreakStyle>
                    <HabitStreakTextStyle className="h5" isHighStreak={isHighStreak}>{habitInfo.currentStreak}</HabitStreakTextStyle>
                    </>
                )}
                {isDescriptionEditing ? (
                    <EditableDescription className="rounded" value={description} onChange={handleDescriptionChange} onBlur={handleDescriptionBlur}/> 
                ) : (
                <HabitDescriptionStyle className="rounded" onClick={handleDescriptionClick}>{description}</HabitDescriptionStyle>
                )}
            </div>
            <div>
                <HabitInfoRightSide className="h3">
                    Time Logged: {habitInfo.numLoggedDays} days
                </HabitInfoRightSide>

                <div>
                    <div className="row">
                        <div className="col-6">
                            <h5 className="d-flex justify-content-center">Week</h5>
                            <div className="d-flex justify-content-center">
                                <PercentIcon percent={habitInfo.percentSuccessWeek}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <h5 className="d-flex justify-content-center">Lifetime</h5>
                            <div className="d-flex justify-content-center">
                                <PercentIcon percent={habitInfo.percentSuccessLifetime}/> 
                            </div>
                        </div>
                    </div>
                </div>

            </div> 
        </MainDivStyle>
    )
}

export default HabitInfoComponent;