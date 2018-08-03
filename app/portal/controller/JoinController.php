<?php

namespace app\portal\controller;

use cmf\controller\HomeBaseController;

class JoinController extends HomeBaseController
{
	public function index()
	{
		return $this->fetch('/join');
	}
}