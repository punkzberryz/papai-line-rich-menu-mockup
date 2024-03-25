prepare_prod:
	cp .env .env.bk
	cp .env.prod .env

prepare_dev:
	cp .env .env.bk
	cp .env.dev .env