# Finance Dashboard Backend

## Overview
Backend API for a financial dashboard system supporting user roles,
financial record management, and dashboard analytics.

## Tech Stack
Node.js
Express
Prisma ORM
MySQL
JWT Authentication
Zod Validation

## Features

User Management
Role Based Access Control
Financial Record CRUD
Dashboard Analytics
Filtering and Pagination
Input Validation

## Roles

Viewer
Analyst
Admin

## API Endpoints

### Auth
POST /api/auth/register
POST /api/auth/login

### Records
POST /api/records
GET /api/records
PATCH /api/records/:id
DELETE /api/records/:id

### Dashboard
GET /api/dashboard/summary
GET /api/dashboard/category-totals
GET /api/dashboard/monthly-trends
GET /api/dashboard/recent-activity

## Setup

## Install dependencies
npm install

## Create .env file
cp .env.example .env
add your database credentials to .env file

## Run migrations
npx prisma migrate dev

## Generate prisma client
npx prisma generate

## Seed roles & categories
npm run prisma:seed

## Start server
npm run dev