<?php

namespace app\portal\controller;

use cmf\controller\HomeBaseController;

class DspController extends HomeBaseController
{
	public function index()
	{
		return $this->fetch('/dsp');
	}

	public function dspRegister()
	{
		print_r($_POST);exit;
		

	}
}