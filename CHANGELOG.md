# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.3.2] - 2016-02-05
### Fixed
- Precision recall sort function fix.
- Moment server/client time rendered the same

### Changed
- When stopping experiment, remove button is displayed (before reload).
- Epoch 0 is not displayed in chart.
- One more digit for chart hover

### Added
- Preview slider for charts

## [1.3.1] - 2016-02-02
### Fixed
- Safari fix. key for React components in SignIn.
- Moment server/client time rendered the same

## [1.3.0] - 2016-02-01
### Added
- Precision and recall curve
- Endpoint for adding precision and recall to an experiment.

### Fixed
- Linechart refactor.
- X axis value displayed on hover.

### Changed
- Comment section moved up.
- Database object for experiment. No more duplicate database code.

## [1.2.0] - 2016-01-29
### Added
- Comment field for each experiment.
- Comment endpoints.
- Endpoints for more results. Displayed as well.

### Fixed
- List of experiments is sorted by start_date.
- Table design fixed. Easier to read.

## [1.1.0] - 2016-01-27
### Added
- Endpoints for debug command.
- Debug button in controls.
- Notifications for commands, remove, debug and stop.

## [1.0.0] - 2016-01-18
### Added
- GUI Front page.
- GUI Experiments page.
- GUI authentication component.
- GUI experiment list component.
- Endpoints for experiment - Start, stop, update, get, get running experiments and so forth.
- Simple token authentication scheme to protect certain endpoints.
- Storing and retrieving experiments via MongoDB.

[Unreleased]: https://github.com/olavvatne/ml-monitor/compare/v1.3.2...HEAD
[1.3.1]: https://github.com/olavvatne/ml-monitor/releases/tag/v1.3.2
[1.3.1]: https://github.com/olavvatne/ml-monitor/releases/tag/v1.3.1
[1.3.0]: https://github.com/olavvatne/ml-monitor/releases/tag/v1.3.0
[1.2.0]: https://github.com/olavvatne/ml-monitor/releases/tag/v1.2.0
[1.1.0]: https://github.com/olavvatne/ml-monitor/releases/tag/v1.1.0
[1.0.0]: https://github.com/olavvatne/ml-monitor/releases/tag/v1.0.0