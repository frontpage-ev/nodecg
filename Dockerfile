FROM ghcr.io/nodecg/nodecg:2.4.3 as builder

#RUN cd schedule && npm install && npm run build

RUN node out/cli.mjs install speedcontrol/nodecg-speedcontrol && node out/cli.mjs defaultconfig nodecg-speedcontrol
COPY bundles/ bundles/
RUN cd bundles/countdown && npm install && npm run dockerBuild && cd ../schedule && npm install && npm run dockerBuild

#RUN node out/cli.mjs install esamarathon/esa-layouts && node out/cli.mjs defaultconfig esa-layouts
#RUN node out/cli.mjs install TwitchCologne/obs-control && node out/cli.mjs defaultconfig obs-control