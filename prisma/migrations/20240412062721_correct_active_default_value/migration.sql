-- AlterTable
ALTER TABLE `group` MODIFY `active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `group_has_schedule` MODIFY `active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `player_has_group` MODIFY `active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `schedule` MODIFY `active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `schedule_has_player` MODIFY `active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` MODIFY `active` INTEGER NULL DEFAULT 1;
