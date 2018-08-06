<?php
/**
 * 品专 - 联系我们
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;

class ContactController extends HomeBaseController
{
	public function index()
	{
		return $this->fetch('/contact');
	}
}