FROM public.ecr.aws/lambda/python:3.9

# Copy function code
COPY apps/lambda_server.py ${LAMBDA_TASK_ROOT}

RUN mkdir -p ${LAMBDA_TASK_ROOT}/apps/src
COPY apps/src/handler.py ${LAMBDA_TASK_ROOT}/apps/src

RUN mkdir -p ${LAMBDA_TASK_ROOT}/pkg
COPY pkg ${LAMBDA_TASK_ROOT}/pkg

RUN mkdir -p ${LAMBDA_TASK_ROOT}/kifu/2.0.2
COPY kifu/2.0.2/net_last.pth ${LAMBDA_TASK_ROOT}/kifu/2.0.2

# Install the function's dependencies using file requirements.txt
# from your project folder.

COPY requirements.txt  .
RUN  pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_server.lambda_handler" ]