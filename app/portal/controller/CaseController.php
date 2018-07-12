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
		if (!input('?post.year')) {
			$this->error('缺少年份参数...');
		}
		$year = input('post.year');
		$limit = 4;		
		return list_case($year, $limit);
	}
}