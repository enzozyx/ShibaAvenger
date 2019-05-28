/*
 Navicat Premium Data Transfer

 Source Server         : enzo`s ali db
 Source Server Type    : PostgreSQL
 Source Server Version : 90608
 Source Host           : 120.27.226.246
 Source Database       : enzo
 Source Schema         : shiba

 Target Server Type    : PostgreSQL
 Target Server Version : 90608
 File Encoding         : utf-8

 Date: 05/22/2019 22:15:49 PM
*/

-- ----------------------------
--  Sequence structure for sa_sequence_of_database_id
-- ----------------------------
DROP SEQUENCE IF EXISTS "shiba"."sa_sequence_of_database_id";
CREATE SEQUENCE "shiba"."sa_sequence_of_database_id" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "shiba"."sa_sequence_of_database_id" OWNER TO "postgres";

-- ----------------------------
--  Sequence structure for sequence_of_db_account_id
-- ----------------------------
DROP SEQUENCE IF EXISTS "shiba"."sequence_of_db_account_id";
CREATE SEQUENCE "shiba"."sequence_of_db_account_id" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "shiba"."sequence_of_db_account_id" OWNER TO "postgres";

-- ----------------------------
--  Table structure for t_database
-- ----------------------------
DROP TABLE IF EXISTS "shiba"."t_database";
CREATE TABLE "shiba"."t_database" (
	"id" int4 NOT NULL DEFAULT nextval('sa_sequence_of_database_id'::regclass),
	"name" varchar(128) NOT NULL COLLATE "default",
	"alias" varchar(128) NOT NULL COLLATE "default",
	"server_ip" varchar(15) COLLATE "default",
	"server_port" int4,
	"category" int2 NOT NULL DEFAULT 2,
	"location" varchar(255) COLLATE "default",
	"lasted" timestamp(6) NOT NULL DEFAULT now()
)
WITH (OIDS=FALSE);
ALTER TABLE "shiba"."t_database" OWNER TO "postgres";

COMMENT ON TABLE "shiba"."t_database" IS '数据信息表，用于存储数据库元信息';
COMMENT ON COLUMN "shiba"."t_database"."id" IS '数据库ID';
COMMENT ON COLUMN "shiba"."t_database"."name" IS ' 数据库实例名';
COMMENT ON COLUMN "shiba"."t_database"."alias" IS '展示别名';
COMMENT ON COLUMN "shiba"."t_database"."server_ip" IS ' 数据库服务IP';
COMMENT ON COLUMN "shiba"."t_database"."server_port" IS '服务端口';
COMMENT ON COLUMN "shiba"."t_database"."category" IS '数据库类型(1-mysql;2-postgresql;3-oracle;4-sqlserver)';
COMMENT ON COLUMN "shiba"."t_database"."location" IS '屋物理存储文件存放位置';
COMMENT ON COLUMN "shiba"."t_database"."lasted" IS '最新更新时间';

-- ----------------------------
--  Table structure for t_db_account
-- ----------------------------
DROP TABLE IF EXISTS "shiba"."t_db_account";
CREATE TABLE "shiba"."t_db_account" (
	"id" int4 NOT NULL DEFAULT nextval('sequence_of_db_account_id'::regclass),
	"username" varchar(255) NOT NULL COLLATE "default",
	"password" varchar(128) NOT NULL COLLATE "default",
	"db_id" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "shiba"."t_db_account" OWNER TO "postgres";

COMMENT ON COLUMN "shiba"."t_db_account"."id" IS '数据库账户ID';
COMMENT ON COLUMN "shiba"."t_db_account"."username" IS '账户名';
COMMENT ON COLUMN "shiba"."t_db_account"."password" IS '账户密码';


-- ----------------------------
--  Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "shiba"."sa_sequence_of_database_id" RESTART 2;
ALTER SEQUENCE "shiba"."sequence_of_db_account_id" RESTART 2;
-- ----------------------------
--  Primary key structure for table t_database
-- ----------------------------
ALTER TABLE "shiba"."t_database" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Checks structure for table t_database
-- ----------------------------
ALTER TABLE "shiba"."t_database" ADD CONSTRAINT "database_checker" CHECK ((category = ANY (ARRAY[1, 2, 3, 4]))) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table t_db_account
-- ----------------------------
ALTER TABLE "shiba"."t_db_account" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table t_db_account
-- ----------------------------
ALTER TABLE "shiba"."t_db_account" ADD CONSTRAINT "unique_of_username_in_same_db" UNIQUE ("username","db_id") NOT DEFERRABLE INITIALLY IMMEDIATE;
COMMENT ON CONSTRAINT "unique_of_username_in_same_db" ON "shiba"."t_db_account" IS '一个数据库内不允许存在多个同名账户';

