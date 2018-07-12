<?php

/**
 * 品专官网 - 经典案例控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;

class CaseController extends HomeBaseController
{
	public function list_case()
	{
		$year = 2016;
		$limit = 4;
		
		list_case(2018);

	}
}