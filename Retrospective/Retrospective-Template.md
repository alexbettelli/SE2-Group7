# TEMPLATE FOR RETROSPECTIVE (Team ##)

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

| Story           | # Tasks | Points | Hours est. | Hours actual |
| --------------- | ------- | ------ | ---------- | ------------ |
| _Uncategorized_ | 14      |        | 46h 30m    | 45h 4m       |
| Get ticket      | 2       | 5      | 3h 30m     | 4h 15m       |
| Next Customer   | 5       | 8      | 12h        | 12h 45m      |

> story `Uncategorized` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|            | Mean   | StDev  |
| ---------- | ------ | ------ |
| Estimation | 2h 57m | 2h 46m |
| Actual     | 2h 57m | 2h 48m |

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

  - We didn’t start working from a common project structure (file configuration, directory setup), which caused many merge conflicts and wasted hours resolving them.
  - Tasks were not well defined, leading to overlapping work and duplicated efforts.
  - We struggled with planning and spent too much time adjusting the 8-hour workload per person.
  - We managed to find time for testing and code review, these activities could have been done more thoroughly.

- What caused your errors in estimation (if any)?

  - We underestimated the time needed to solve merge conflicts (including it in the estimation of each task), but it turned out to be significant.
  - A YouTrack miscalculation caused our total estimated hours to be 62 instead of the recommended 60. This happened because when we reassigned a task, we forgot to adjust the hours in the original one.

- What lessons did you learn (both positive and negative) in this sprint?

  - We learned the importance of proper time management and clear task definition.
  - Sketching the design, defining code standards, and establishing a shared structure are essential to avoid merge conflicts.
  - Communication and collaboration were key to success.
  - If a story cannot be fully completed with all requirements, it’s better to focus on finishing an easier one properly.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - We did not have a previous retro, because this was our first sprint.

- Which ones you were not able to achieve? Why?

  - We did not have a previous retro, because this was our first sprint.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > Propose one or two

  - Define and differentiate tasks more clearly, with well-separated scopes and balancing coding, testing, and documentation.
  - Establish a common structure and coding standards to reduce merge conflicts.

- One thing you are proud of as a Team!!
  - We’re proud of our teamwork and reliability: everyone collaborated, completed their tasks on time, and maintained high quality.
  - There was great cooperation and mutual support; team members were flexible in helping others and taking on new tasks when needed.
