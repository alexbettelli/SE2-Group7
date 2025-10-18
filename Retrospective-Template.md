TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done 
- Total points committed vs. done 
- Nr of hours planned vs. spent (as a team)

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _Uncategorized_   |  14  |      |  46h 30m  | 45h 4m |
| Get ticket      | 2 | 5  | 3h 30m | 4h 15m |
| Next Customer | 5 | 8 | 12h | 12h 45m  |

> story `Uncategorized` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|            | Mean | StDev |
|------------|------|-------|
| Estimation |  2h 57m  | 2h 46m | 
| Actual     |  2h 57m    | 2h 48m |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1 = 0,000537634$$
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| = 0,218783069$$
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 4h
  - Total hours spent: 3h,10m
  - Nr of automated unit test cases: 14
  - Coverage: 82.17% (lines coverage)
- E2E testing:
  - Total hours estimated: 2h 
  - Total hours spent: 1h,55m
  - Nr of test cases: 14
- Code review 
  - Total hours estimated: 1h
  - Total hours spent: 1h
  


## ASSESSMENT

- What did go wrong in the sprint?

- What caused your errors in estimation (if any)?

- What lessons did you learn (both positive and negative) in this sprint?

- Which improvement goals set in the previous retrospective were you able to achieve? 
  
- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > Propose one or two

- One thing you are proud of as a Team!!