from apps.src.handler import handler


def lambda_handler(event, context):
    return handler(event['moves'])
