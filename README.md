
# Terjadinya Hidup Parse Script

Install dependencies: `npm install`

Create `.env` file in root folder and follow what's inside `.env.sample`. Change value accordingly.

1. Change CONFIG boolean in `index.js` into:
    - **debug**: debug mode (console.log will be displayed)
    - **isLegacy**: true; reads from legacy format, false; reads from new format
    - **source**: change raw diary source file (See note below)
2. Run `npm start`

\*Note:
Check in `/source` folder for raw diary file. For Github, I created dummy files for legacy and new diary format.

Please create a new source file for testing (use `debug = true` for this purpose).

## Database stuff

**Entries table**

```
id: int, ai, pk
title: varchar, 255, null
date: varchar, not null
body: text, null
```

Schema query:

```
CREATE TABLE `terjadinya_hidup`.`entries` ( `id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(255) NULL , `date` VARCHAR(255) NOT NULL , `body` TEXT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

Check validity:

Experiment with these queries from phpmyadmin/Workbench and check for anomalies.

```
SELECT * FROM entries ORDER BY length(`title`) ASC;
SELECT * FROM entries ORDER BY length(`date`) ASC;
```
