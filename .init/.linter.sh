#!/bin/bash
cd /home/kavia/workspace/code-generation/3d-cube-tic-tac-toe-283601-283610/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

