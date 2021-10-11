#!/bin/bash
docker run \
    -e EULA=TRUE \
    -e ONLINE_MODE=FALSE \
    -e OPS=shino_hinaduki,stackstuck \
    -e DIFFICULTY=peaceful \
    -p 25565:25565 itzg/minecraft-server
