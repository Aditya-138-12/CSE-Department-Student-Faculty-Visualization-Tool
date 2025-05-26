import React, { useState } from 'react';
import "./QuestionPallettee.css";
import {
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Typography,
    Paper,
    useTheme,
    useMediaQuery,
} from '@mui/material';

const QuestionComponent = ({
    questionData, selectedAnswer, onAnswerChange
}) => {
    const [selectedValue, setSelectedValue] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (event) => {
        onAnswerChange(questionData.id, event.target.value);
    };

    return (
        <Box id="Box" sx={{
            width: '50%',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 }
        }}>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: '800px',
                    margin: 'auto',
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: { xs: 2, sm: 3 },
                }}
            >
                <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    gutterBottom
                    sx={{
                        fontWeight: 500,
                        fontSize: {
                            xs: '1.1rem',
                            sm: '1.25rem',
                            md: '1.5rem'
                        },
                        lineHeight: 1.4,
                        mb: { xs: 2, sm: 3 }
                    }}
                >
                    {"Q" + questionData.id + ". "}
                    {questionData.questionContent}
                </Typography>

                <FormControl
                    component="fieldset"
                    sx={{ width: '100%' }}
                >
                    <RadioGroup
                        value={selectedAnswer}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            gap: { xs: 1, sm: 1.5, md: 2 }
                        }}
                    >
                        {questionData.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: { xs: 20, sm: 24 }
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.1rem'
                                            }
                                        }}
                                    >
                                        {option}
                                    </Typography>
                                }
                                sx={{
                                    margin: 0,
                                    width: '100%',
                                    padding: { xs: 1, sm: 1.5 },
                                    borderRadius: 1,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                    '&.Mui-checked': {
                                        backgroundColor: theme.palette.action.selected,
                                    }
                                }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Paper>
        </Box>
    );
};

export default QuestionComponent;