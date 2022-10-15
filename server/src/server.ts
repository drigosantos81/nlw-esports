import express, { response } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

import { convertHourStringToMinutes } from './utils/convert-hour-strig-to-minutes'
import { convertMinutesToHoursString } from './utils/convert-minutes-strig-to-hours'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return response.json([games]);
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),//body.hourStart, 
      HourEnd: convertHourStringToMinutes(body.HourEnd),//body.HourEnd, 
      useVoiceChannel: body.useVoiceChannel,
    }
  })
  
  return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      HourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return response.json(ads.map(ad => {
    return {
      ...ads,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHoursString(ad.hourStart),
      HourEnd: convertMinutesToHoursString(ad.HourEnd),
    }
  }));
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })
  
  return response.json({
    discord: ad.discord
  })
})

app.listen(3333, function() {
  console.log("Server ir runnig");
})